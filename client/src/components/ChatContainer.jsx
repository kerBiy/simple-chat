import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, receiveMessageRoute } from "../utils/APIRoutes";

const ChatContainer = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      const response = await axios.post(receiveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("chat-app-user"));

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });
  };

  return (
    <div className="h-screen flex flex-col justify-between ">
      <div className="flex items-center px-8 py-4 gap-4 shadow-md">
        <img
          className="w-16"
          src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
          alt="avatar"
        />

        <h3 className="text-white text-2xl">{currentChat.username}</h3>
      </div>

      <div className="overflow-auto p-6 text-white">
        {messages.map((message) => (
          <div
            key={uuidv4()}
            className={`flex ${
              message.fromSelf ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-xs p-4 rounded-lg shadow-lg ${
                message.fromSelf
                  ? "bg-teal-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChatContainer;
