import React from 'react';

const ChatMessage = ({ message, isUser, timestamp }) => {
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-content">
        <div className="message-text">
          {message}
        </div>
        <div className="message-time">
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;