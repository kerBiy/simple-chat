import React from "react";
import ChatInput from "../components/ChatInput";

const ChatContainer = ({ currentChat }) => {
  const handleSendMsg = () => {};

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex items-center px-8 py-4 gap-4 shadow-md">
        <img
          className="w-16"
          src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
          alt="avatar"
        />

        <h3 className="text-white text-2xl">{currentChat.username}</h3>
      </div>
      <div className="text-white text-center flex items-center justify-center h-full">All the messages</div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChatContainer;
