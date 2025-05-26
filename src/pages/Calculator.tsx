
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Calculator = () => {
  const [formData, setFormData] = useState({
    electricity: "",
    gas: "",
    householdSize: "",
    carDistance: "",
    vehicleType: "",
    shortFlights: "",
    longFlights: "",
    dietType: "",
    meatFrequency: "",
    shopping: "",
    recycling: ""
  });
  
  const [result, setResult] = useState<number | null>(null);

  const calculateFootprint = () => {
    // Carbon footprint calculation factors (in tonnes CO2/month)
    let totalEmissions = 0;

    // Electricity (0.0005 tonnes CO2 per kWh)
    totalEmissions += parseFloat(formData.electricity || "0") * 0.0005;

    // Natural gas (0.0053 tonnes CO2 per cubic meter, approx 0.0019 per kWh equivalent)
    totalEmissions += parseFloat(formData.gas || "0") * 0.0019;

    // Car travel (0.00012 tonnes CO2 per km for average car)
    const vehicleFactors = {
      gasoline: 0.00012,
      diesel: 0.00011,
      hybrid: 0.00006,
      electric: 0.00002
    };
    const vehicleFactor = vehicleFactors[formData.vehicleType as keyof typeof vehicleFactors] || 0.00012;
    totalEmissions += parseFloat(formData.carDistance || "0") * vehicleFactor;

    // Flights (short-haul: 0.15 tonnes, long-haul: 0.6 tonnes per flight)
    totalEmissions += parseFloat(formData.shortFlights || "0") * 0.15;
    totalEmissions += parseFloat(formData.longFlights || "0") * 0.6;

    // Diet (monthly emissions)
    const dietFactors = {
      vegan: 0.1,
      vegetarian: 0.15,
      omnivore: 0.25
    };
    totalEmissions += dietFactors[formData.dietType as keyof typeof dietFactors] || 0.25;

    // Meat frequency modifier
    const meatFactors = {
      daily: 1.5,
      weekly: 1.2,
      rarely: 0.8,
      never: 0.5
    };
    totalEmissions *= meatFactors[formData.meatFrequency as keyof typeof meatFactors] || 1;

    // Shopping habits
    const shoppingFactors = {
      rarely: 0.8,
      monthly: 1.0,
      weekly: 1.3
    };
    totalEmissions *= shoppingFactors[formData.shopping as keyof typeof shoppingFactors] || 1;

    // Recycling bonus
    if (formData.recycling === "yes") {
      totalEmissions *= 0.9; // 10% reduction
    }

    // Household size adjustment
    const householdSize = parseFloat(formData.householdSize || "1");
    totalEmissions = totalEmissions / Math.sqrt(householdSize); // Economies of scale

    setResult(Math.round(totalEmissions * 100) / 100);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-green-600 hover:text-green-700 mr-6">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <Leaf className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-green-800">Carbon Footprint Calculator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-green-600" />
                Calculate Your Impact
              </CardTitle>
              <CardDescription>
                Fill out the form below to estimate your monthly carbon footprint
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="electricity">Electricity (kWh/month)</Label>
                  <Input
                    id="electricity"
                    type="number"
                    placeholder="300"
                    value={formData.electricity}
                    onChange={(e) => handleInputChange("electricity", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="gas">Natural Gas (therms/month)</Label>
                  <Input
                    id="gas"
                    type="number"
                    placeholder="50"
                    value={formData.gas}
                    onChange={(e) => handleInputChange("gas", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="household">Household Size</Label>
                  <Input
                    id="household"
                    type="number"
                    placeholder="2"
                    value={formData.householdSize}
                    onChange={(e) => handleInputChange("householdSize", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="carDistance">Car Travel (km/month)</Label>
                  <Input
                    id="carDistance"
                    type="number"
                    placeholder="1000"
                    value={formData.carDistance}
                    onChange={(e) => handleInputChange("carDistance", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Vehicle Type</Label>
                <Select onValueChange={(value) => handleInputChange("vehicleType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shortFlights">Short-haul Flights/month</Label>
                  <Input
                    id="shortFlights"
                    type="number"
                    placeholder="0"
                    value={formData.shortFlights}
                    onChange={(e) => handleInputChange("shortFlights", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="longFlights">Long-haul Flights/month</Label>
                  <Input
                    id="longFlights"
                    type="number"
                    placeholder="0"
                    value={formData.longFlights}
                    onChange={(e) => handleInputChange("longFlights", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Diet Type</Label>
                  <Select onValueChange={(value) => handleInputChange("dietType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select diet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="omnivore">Omnivore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Red Meat Frequency</Label>
                  <Select onValueChange={(value) => handleInputChange("meatFrequency", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="rarely">Rarely</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Shopping Frequency</Label>
                  <Select onValueChange={(value) => handleInputChange("shopping", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rarely">Rarely</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Do you recycle?</Label>
                  <Select onValueChange={(value) => handleInputChange("recycling", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateFootprint} className="w-full bg-green-600 hover:bg-green-700">
                Calculate Carbon Footprint
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result !== null && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Your Carbon Footprint</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {result} tonnes
                    </div>
                    <div className="text-gray-600 mb-4">CO₂ equivalent per month</div>
                    
                    <div className="space-y-3 text-left">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800">Impact Assessment:</h4>
                        <p className="text-green-700">
                          {result < 1 ? "Excellent! You have a low carbon footprint." :
                           result < 2 ? "Good! Your footprint is below average." :
                           result < 3 ? "Average footprint. Consider reducing emissions." :
                           "High footprint. Significant reduction opportunities exist."}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800">Quick Tips:</h4>
                        <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
                          <li>Switch to renewable energy sources</li>
                          <li>Use public transport or electric vehicles</li>
                          <li>Reduce meat consumption</li>
                          <li>Buy local and seasonal products</li>
                          <li>Improve home insulation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>About This Calculator</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>Our calculator uses scientifically-based emission factors from:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>EPA greenhouse gas equivalencies</li>
                  <li>IPCC assessment reports</li>
                  <li>Department of Energy statistics</li>
                  <li>Academic research on lifestyle emissions</li>
                </ul>
                <p className="pt-2">
                  Results are estimates based on average values. Individual circumstances may vary.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calculator;
