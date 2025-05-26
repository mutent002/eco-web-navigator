
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, CheckCircle, XCircle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "What percentage of global greenhouse gas emissions comes from agriculture?",
      options: ["10-15%", "20-25%", "30-35%", "40-45%"],
      correct: 1,
      explanation: "Agriculture accounts for approximately 24% of global greenhouse gas emissions, making it one of the largest contributors to climate change."
    },
    {
      question: "Which renewable energy source has the fastest growing capacity globally?",
      options: ["Wind", "Solar", "Hydroelectric", "Geothermal"],
      correct: 1,
      explanation: "Solar energy has been the fastest-growing renewable energy source in recent years, with costs decreasing dramatically."
    },
    {
      question: "How much water does it take to produce 1 kg of beef?",
      options: ["500-1,000 liters", "5,000-10,000 liters", "15,000-20,000 liters", "25,000-30,000 liters"],
      correct: 2,
      explanation: "It takes approximately 15,000-20,000 liters of water to produce 1 kg of beef, considering feed production, drinking water, and processing."
    },
    {
      question: "What is the main cause of deforestation globally?",
      options: ["Urban development", "Agriculture", "Logging", "Mining"],
      correct: 1,
      explanation: "Agriculture is responsible for about 80% of global deforestation, primarily for cattle ranching and crop cultivation."
    },
    {
      question: "By what year do scientists recommend reaching net-zero emissions to limit warming to 1.5°C?",
      options: ["2030", "2040", "2050", "2060"],
      correct: 2,
      explanation: "The IPCC recommends reaching net-zero CO2 emissions by 2050 to have a good chance of limiting global warming to 1.5°C above pre-industrial levels."
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (parseInt(answer) === questions[index].correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
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
              <h1 className="text-2xl font-bold text-green-800">Sustainability Quiz Results</h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-green-700">Quiz Complete!</CardTitle>
              <CardDescription className="text-xl">
                You scored {score} out of {questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-4">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <div className="mb-6">
                {score === questions.length && (
                  <p className="text-green-700 text-lg">Perfect! You're a sustainability expert! 🌱</p>
                )}
                {score >= questions.length * 0.8 && score < questions.length && (
                  <p className="text-green-700 text-lg">Excellent knowledge of sustainability! 🌿</p>
                )}
                {score >= questions.length * 0.6 && score < questions.length * 0.8 && (
                  <p className="text-blue-700 text-lg">Good understanding! Keep learning! 📚</p>
                )}
                {score < questions.length * 0.6 && (
                  <p className="text-orange-700 text-lg">Room for improvement. Try again! 💪</p>
                )}
              </div>
              <Button onClick={resetQuiz} className="bg-green-600 hover:bg-green-700 mr-4">
                Take Quiz Again
              </Button>
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Review Your Answers</h2>
            {questions.map((question, index) => {
              const userAnswer = parseInt(answers[index]);
              const isCorrect = userAnswer === question.correct;
              
              return (
                <Card key={index} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500 mr-2" />
                      )}
                      Question {index + 1}
                    </CardTitle>
                    <CardDescription className="text-base">{question.question}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded ${
                            optionIndex === question.correct
                              ? 'bg-green-100 text-green-800 font-semibold'
                              : optionIndex === userAnswer && userAnswer !== question.correct
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-50'
                          }`}
                        >
                          {option}
                          {optionIndex === question.correct && (
                            <span className="ml-2 text-green-600">✓ Correct</span>
                          )}
                          {optionIndex === userAnswer && userAnswer !== question.correct && (
                            <span className="ml-2 text-red-600">✗ Your answer</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-1">Explanation:</h4>
                      <p className="text-blue-700">{question.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-green-800">Sustainability Quiz</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-green-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-green-700">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-6 w-6 mr-2 text-green-600" />
              Question {currentQuestion + 1}
            </CardTitle>
            <CardDescription className="text-lg">
              {questions[currentQuestion].question}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion] || ""}
              onValueChange={(value) => handleAnswer(value)}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-green-50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1 text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between items-center mt-8">
              <div className="text-sm text-gray-600">
                {answers[currentQuestion] ? "Answer selected" : "Please select an answer"}
              </div>
              <Button
                onClick={nextQuestion}
                disabled={!answers[currentQuestion]}
                className="bg-green-600 hover:bg-green-700"
              >
                {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Educational Tip */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Did you know?</h3>
            <p className="text-blue-700">
              Sustainable development meets the needs of the present without compromising the ability 
              of future generations to meet their own needs. Every small action counts towards a better future!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Quiz;
