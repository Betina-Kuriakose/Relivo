import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  // State for statistics
  const [statistics, setStatistics] = useState({
    peopleInNeed: 12500,
    totalDonations: 24500,
    fundsRaised: 1875000,
    livesImpacted: 56000
  });

  // State for past disasters
  const [pastDisasters, setPastDisasters] = useState([
    { 
      title: 'Kerala Flood Relief', 
      date: 'August 2023', 
      description: 'Provided emergency shelter and supplies to 15,000 affected families',
      impact: '15K+ Families Helped',
      image: 'https://placehold.co/400x250/4f46e5/ffffff?text=Kerala+Flood+Relief'
    },
    { 
      title: 'Nepal Earthquake Response', 
      date: 'April 2023', 
      description: 'Rebuilt homes and provided medical aid to earthquake victims',
      impact: '8K+ Homes Rebuilt',
      image: 'https://placehold.co/400x250/ec4899/ffffff?text=Nepal+Earthquake'
    },
    { 
      title: 'Cyclone Fani Recovery', 
      date: 'May 2023', 
      description: 'Distributed essential supplies and helped restore infrastructure',
      impact: '12K+ Essentials Distributed',
      image: 'https://placehold.co/400x250/06b6d4/ffffff?text=Cyclone+Fani'
    }
  ]);

  // State for victim reviews
  const [reviews, setReviews] = useState([
    { 
      name: 'Anita Sharma', 
      review: 'When the floods took everything, your donations gave us hope. The emergency supplies saved my family.',
      location: 'Kerala Flood Survivor',
      avatar: 'A'
    },
    { 
      name: 'Raj Kumar', 
      review: 'The medical aid and shelter provided during the earthquake helped us survive the toughest times.',
      location: 'Nepal Earthquake Survivor',
      avatar: 'R'
    },
    { 
      name: 'Sunita Patel', 
      review: 'Your generosity rebuilt our community. The school supplies for children meant everything to us.',
      location: 'Cyclone Fani Survivor',
      avatar: 'S'
    }
  ]);

  // State for AI chatbot
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! I'm your AI Relief Assistant 🌟 I can help you make donations, track relief efforts, or get information about our disaster response programs. How can I assist you today?", sender: 'ai' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  // Animate statistics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      const newMessage = { text: userInput, sender: 'user' };
      setChatMessages([...chatMessages, newMessage]);
      setUserInput('');
      
      setTimeout(() => {
        const aiResponse = generateAIResponse(userInput);
        setChatMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
      }, 1000);
    }
  };

  const generateAIResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('donate')) {
      return "You can make a secure donation through our portal! 💝 We accept various payment methods and provide complete transparency. Every donation directly helps disaster victims with emergency supplies, shelter, and medical care.";
    } else if (lowerInput.includes('help') || lowerInput.includes('assistance')) {
      return "We provide comprehensive disaster relief including emergency shelter 🏠, medical aid 🏥, food supplies 🍲, and long-term recovery support. Let me know what specific help you need!";
    } else if (lowerInput.includes('track')) {
      return "You can track your donation's journey in real-time on our interactive map! 🗺️ We provide updates every step of the way - from collection to distribution.";
    } else if (lowerInput.includes('emergency')) {
      return "🚨 For immediate emergency assistance, please call our 24/7 helpline: 1-800-RELIEF-AI. We're here to help you right now!";
    } else {
      return "I'm here to make helping easy! 💫 You can ask about making donations, getting assistance, tracking resources, or learning about specific disaster responses. How can I support you today?";
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-20 rounded-full transform -translate-x-40 translate-y-40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <span className="text-yellow-300 mr-2">⭐</span>
              <span className="text-sm">Trusted by 50,000+ Donors Worldwide</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Hope</span> in 
            <span className="block">Times of Crisis</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed opacity-95">
            Your compassion transforms lives. Join our mission to provide immediate relief and lasting hope to disaster-affected communities.
          </p>

          <div className="mb-12">
            <img 
              src="https://placehold.co/1000x500/1e40af/ffffff?text=Community+Coming+Together+in+Times+of+Need" 
              alt="Diverse community members working together in disaster relief efforts, carrying emergency supplies and helping each other with compassion and determination"
              className="mx-auto rounded-2xl shadow-2xl w-full max-w-4xl border-4 border-white/20"
            />
          </div>

          <div className="space-x-4 space-y-4 sm:space-y-0">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl">
              💝 Make a Difference Now
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300">
              📋 See Our Impact
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Transforming <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Lives</span> Every Day
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real numbers that show the power of collective compassion and action
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: statistics.peopleInNeed, label: 'People in Need', icon: '🙏', color: 'blue' },
              { number: statistics.totalDonations, label: 'Total Donations', icon: '💝', color: 'pink' },
              { number: statistics.fundsRaised, label: 'Funds Raised', icon: '💰', color: 'green' },
              { number: statistics.livesImpacted, label: 'Lives Impacted', icon: '🌟', color: 'purple' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`relative group p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  index === currentStat ? 'scale-105' : 'scale-100'
                } ${
                  stat.color === 'blue' ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100' :
                  stat.color === 'pink' ? 'bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100' :
                  stat.color === 'green' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100' :
                  'bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100'
                }`}
              >
                <div className="text-4xl mb-4 opacity-80">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {typeof stat.number === 'number' ? stat.number.toLocaleString() : stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Map Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Watch Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Impact</span> in Real-Time
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Transparent tracking from your donation to those in need
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-1 border border-white/10">
            <div className="map-container h-96 rounded-2xl overflow-hidden relative">
              <img 
                src="https://placehold.co/1200x600/0f172a/38bdf8?text=Interactive+Global+Relief+Map" 
                alt="Interactive world map showing real-time donation distribution with animated routes connecting donor cities to disaster zones across continents"
                className="w-full h-full object-cover"
              />
              
              {/* Map Overlays */}
              <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">🌍 Live Operations</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span>12 Active Deliveries</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    <span>8 Distribution Centers</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">📊 Current Stats</h4>
                <div className="text-sm space-y-1">
                  <div>🔄 98% Delivery Success</div>
                  <div>⏱️ Avg. Response: 4.2h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Disasters Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Recent <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">Crisis</span> Responses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              How your support has made a tangible difference in recent disasters
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastDisasters.map((disaster, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={disaster.image}
                    alt={disaster.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {disaster.impact}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {disaster.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{disaster.date}</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">{disaster.description}</p>
                  
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                    Read Success Story
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Victim Reviews Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Stories of <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Hope</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real voices from people whose lives were transformed by your generosity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {review.avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="text-6xl absolute -top-8 -left-4 text-purple-100 opacity-50">"</div>
                  <p className="text-gray-700 leading-relaxed relative z-10 italic">
                    {review.review}
                  </p>
                </div>
                
                <div className="mt-6 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Toggle Button */}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 group"
        >
          <span className="text-2xl">💬</span>
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center animate-pulse">
            !
          </span>
        </button>
      )}

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-2xl w-96 z-50 overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h4 className="font-bold">ReliefAI Assistant</h4>
                  <p className="text-sm opacity-90">Here to help you make a difference</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block px-4 py-3 rounded-2xl max-w-xs ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white text-gray-800 shadow-md'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleChatSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about donations, assistance, or tracking..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Join Our Mission</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Together, we can bring hope and help to those who need it most. Every donation makes a difference.
          </p>
          
          <button className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-500 hover:to-red-500 transform hover:scale-105 transition-all duration-300 mb-8">
            💫 Start Making an Impact Today
          </button>
          
          <div className="border-t border-gray-800 pt-8 mt-8">
            <p className="text-gray-400">
              © 2024 ReliefAI. Making every donation count in times of crisis.
            </p>
          </div>
        </div>
      </footer>
    </div>
    
  );
};

export default Home;
