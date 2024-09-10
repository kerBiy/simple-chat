import React from "react";

const ChatContainer = ({ currentChat }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-white text-3xl">
        Chat with <span className="text-teal-400">{currentChat.username}</span>
      </div>
    </div>
  );
};

export default ChatContainer;
