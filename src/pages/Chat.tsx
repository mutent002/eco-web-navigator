
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate random username on component mount
  useEffect(() => {
    const adjectives = ["Green", "Eco", "Solar", "Wind", "Earth", "Ocean", "Forest", "Leaf", "Pure", "Clean"];
    const nouns = ["Warrior", "Guardian", "Hero", "Champion", "Advocate", "Friend", "Helper", "Lover", "Saver", "Pioneer"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    setUsername(`${randomAdjective}${randomNoun}${randomNumber}`);

    // Add welcome messages
    const welcomeMessages: Message[] = [
      {
        id: "1",
        username: "EcoBot",
        text: "Welcome to the EcoPortal Community Chat! 🌱 Share your sustainability tips and connect with like-minded individuals.",
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: "2",
        username: "GreenWarrior42",
        text: "Just switched to LED bulbs throughout my house! Small changes add up! 💡",
        timestamp: new Date(Date.now() - 240000)
      },
      {
        id: "3",
        username: "EcoChampion88",
        text: "Started composting last month. It's amazing how much food waste we can reduce! 🌿",
        timestamp: new Date(Date.now() - 180000)
      },
      {
        id: "4",
        username: "SolarAdvocate12",
        text: "Anyone have experience with solar panels? Thinking about making the switch!",
        timestamp: new Date(Date.now() - 120000)
      },
      {
        id: "5",
        username: "OceanGuardian",
        text: "Beach cleanup this weekend was amazing! Removed 50kg of plastic waste 🏖️",
        timestamp: new Date(Date.now() - 60000)
      }
    ];
    setMessages(welcomeMessages);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: Date.now().toString(),
      username: username,
      text: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate other users responding occasionally
    if (Math.random() < 0.3) {
      setTimeout(() => {
        const responses = [
          "Great point! Thanks for sharing! 👍",
          "I totally agree with that approach!",
          "That's really inspiring! 🌟",
          "Thanks for the tip! I'll definitely try that.",
          "Love seeing the community engagement! 💚",
          "Small steps lead to big changes!",
          "That's a fantastic idea!",
          "Really appreciate you sharing that experience!"
        ];
        const randomUser = ["EcoFriend99", "GreenThumb22", "NatureLover", "CleanEnergy55", "SustainableLife"][Math.floor(Math.random() * 5)];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const botMessage: Message = {
          id: (Date.now() + 1000).toString(),
          username: randomUser,
          text: randomResponse,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      }, 2000 + Math.random() * 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
            <h1 className="text-2xl font-bold text-green-800">Community Chat</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-6 w-6 mr-2 text-green-600" />
                  Live Chat
                </CardTitle>
                <CardDescription>
                  You're chatting as <span className="font-semibold text-green-700">{username}</span>
                </CardDescription>
              </CardHeader>
              
              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.username === username ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.username === username
                          ? 'bg-green-600 text-white'
                          : message.username === 'EcoBot'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="font-semibold text-sm mb-1">
                        {message.username}
                        <span className="ml-2 text-xs opacity-75">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <div className="text-sm">{message.text}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} className="bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chat Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>🌱 Share sustainability tips</p>
                <p>🤝 Be respectful and supportive</p>
                <p>💡 Ask questions and learn together</p>
                <p>🌍 Focus on environmental topics</p>
                <p>📚 Share resources and experiences</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Topics</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">#renewable-energy</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">#zero-waste</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">#gardening</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">#electric-vehicles</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">#composting</span>
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">#sustainable-living</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="p-2 bg-green-50 rounded">
                  <p className="font-semibold text-green-800">Today's Tip:</p>
                  <p className="text-green-700">Use cold water for washing clothes - it can save up to 90% of energy!</p>
                </div>
                <div className="p-2 bg-blue-50 rounded">
                  <p className="font-semibold text-blue-800">Did you know?</p>
                  <p className="text-blue-700">Unplugging devices when not in use can reduce phantom energy consumption by up to 10%.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
