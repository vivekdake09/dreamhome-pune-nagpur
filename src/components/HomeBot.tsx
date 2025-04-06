
import React, { useState } from 'react';
import { MessageSquare, Send, X, ChevronRight, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I\'m HomeBot, your personal real estate assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date()
  }
];

const suggestedQuestions = [
  'What are the best areas to buy a flat in Pune?',
  'How do I check RERA approval for a property?',
  'What documents are needed when buying a property?',
  'What is the home loan process?'
];

const HomeBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after a delay (in a real app, this would call an API)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I'll help you with "${text}". In a complete application, I would provide real information about properties in Pune and Nagpur.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-8 right-8 bg-realestate-600 hover:bg-realestate-700 text-white rounded-full p-3 shadow-lg z-40 transition-all duration-300"
        aria-label="Open HomeBot chat assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-80 md:w-96 bg-white rounded-lg shadow-xl z-40 flex flex-col max-h-[600px] border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-realestate-600 text-white rounded-t-lg">
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              <h3 className="font-medium">HomeBot</h3>
            </div>
            <button 
              onClick={toggleChatbot}
              className="text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-realestate-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 block mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Suggested questions */}
          {messages.length <= 2 && (
            <div className="px-4 py-3 bg-gray-50 space-y-2">
              <p className="text-xs text-gray-500">Suggested questions:</p>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full text-left text-xs bg-white border border-gray-200 hover:bg-gray-50 rounded-md px-3 py-2 flex justify-between items-center"
                  >
                    <span className="line-clamp-1">{question}</span>
                    <ChevronRight className="h-3 w-3 flex-shrink-0 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input form */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-realestate-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="bg-realestate-600 hover:bg-realestate-700 disabled:bg-realestate-400 text-white rounded-r-md px-4"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default HomeBot;
