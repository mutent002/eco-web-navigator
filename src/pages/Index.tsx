
import { Link } from "react-router-dom";
import { Calculator, Brain, MessageCircle, Leaf } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-green-800">EcoPortal</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
            Build a Sustainable Future
          </h2>
          <p className="text-xl text-green-700 max-w-3xl mx-auto">
            Calculate your carbon footprint, test your knowledge, and connect with like-minded individuals 
            committed to environmental sustainability.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link to="/calculator" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-green-100 hover:border-green-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-6 group-hover:bg-green-200 transition-colors">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Carbon Footprint Calculator
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Measure your environmental impact and discover ways to reduce your carbon emissions 
                  with our comprehensive calculator.
                </p>
              </div>
            </div>
          </Link>

          <Link to="/quiz" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-green-100 hover:border-green-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Sustainability Quiz
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Test your knowledge about sustainable development and learn new facts 
                  about environmental conservation.
                </p>
              </div>
            </div>
          </Link>

          <Link to="/chat" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-green-100 hover:border-green-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-6 group-hover:bg-purple-200 transition-colors">
                  <MessageCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Community Chat
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with fellow eco-warriors, share tips, and discuss sustainable 
                  living practices in our community.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold text-green-800 mb-6">
            Why Choose EcoPortal?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-semibold text-green-700 mb-2">Science-Based</h4>
              <p className="text-green-600">Our calculations use verified scientific data and industry standards.</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-semibold text-green-700 mb-2">Educational</h4>
              <p className="text-green-600">Learn practical tips and facts about sustainable living.</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-semibold text-green-700 mb-2">Community-Driven</h4>
              <p className="text-green-600">Connect with others who share your environmental values.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
