import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Relivo AI Assistant. How can I help you with disaster relief information?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('donate') || lowerMessage.includes('donation')) {
      return "To make a donation, click the 'Donate Now' button on our homepage or visit the Donations page. All donations are tracked transparently and go directly to families in need.";
    } else if (lowerMessage.includes('track') || lowerMessage.includes('status')) {
      return "You can track donations in real-time using our interactive map. Visit the Map page to see the current status of relief efforts across different locations.";
    } else if (lowerMessage.includes('disaster') || lowerMessage.includes('emergency')) {
      return "Our AI system continuously monitors disaster risks. Check the Disaster Prediction section on the homepage for current risk assessments and early warnings.";
    } else if (lowerMessage.includes('ngo') || lowerMessage.includes('organization')) {
      return "NGOs can register and access their dashboard to manage relief efforts, track donations, and coordinate with other organizations. Visit the NGO Login page to get started.";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! You can ask me about donations, tracking, disaster predictions, NGO registration, or any other questions about our platform.";
    } else {
      return "I understand you're asking about: '" + message + "'. For more specific information about donations, tracking, or disaster relief, please let me know what you'd like to know more about.";
    }
  };

  const quickActions = [
    { text: "How do I donate?", action: "donate" },
    { text: "Track my donation", action: "track" },
    { text: "Disaster predictions", action: "disaster" },
    { text: "NGO registration", action: "ngo" }
  ];

  const handleQuickAction = (action) => {
    const actionMessages = {
      donate: "How do I donate?",
      track: "How can I track my donation?",
      disaster: "Tell me about disaster predictions",
      ngo: "How do I register as an NGO?"
    };
    setInputMessage(actionMessages[action]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2 className="text-2xl font-bold text-white">🤖 Relivo AI Assistant</h2>
        <p className="text-gray-200">Ask me anything about disaster relief and donations</p>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-actions">
        <p className="text-sm text-gray-600 mb-2">Quick actions:</p>
        <div className="quick-buttons">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.action)}
              className="quick-btn"
            >
              {action.text}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="chatbot-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask me anything about disaster relief..."
          className="message-input"
        />
        <button type="submit" className="send-button" disabled={!inputMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
