import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./components/ChatMessage";
import MovieSuggestion from "./components/MovieSuggestion";
import { generateMovieRecommendations } from "./services/aiService";
import "./app.css";

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI movie assistant. Tell me about a movie you're looking for, share a famous quote, describe a scene, or just tell me what mood you're in!",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const result = await generateMovieRecommendations(inputValue);
      
      // Add AI response
      const aiResponse = {
        id: Date.now() + 1,
        text: result.analysis.explanation,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        movies: result.recommendations
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error while searching for movies. Please try again!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="app">
      <div className="chat-header">
        <h1>🎬 MovieBot AI</h1>
        <p>Your intelligent movie recommendation assistant</p>
      </div>

      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage 
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
              {message.movies && message.movies.length > 0 && (
                <div className="movie-suggestions">
                  {message.movies.map((movie, index) => (
                    <MovieSuggestion key={index} movie={movie} />
                  ))}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="loading-message">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>Analyzing your request...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <div className="chat-input">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about movies, quotes, scenes, or describe what you're in the mood for..."
              rows="1"
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="send-button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;