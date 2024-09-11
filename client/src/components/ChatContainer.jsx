import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, receiveMessageRoute } from "../utils/ApiRoutes";

const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        const data = await JSON.parse(localStorage.getItem("chat-app-user"));
        const response = await axios.post(receiveMessageRoute, {
          from: data._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("chat-app-user"));

    socket.current.emit("send-msg", {
      from: data._id,
      to: currentChat._id,
      msg,
    });

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center px-8 py-4 gap-4 shadow-md">
        <img
          className="w-16"
          src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
          alt="avatar"
        />

        <h3 className="text-white text-2xl">{currentChat.username}</h3>
      </div>

      <div className="flex-grow overflow-auto p-6 text-white">
        {messages.map((message) => (
          <div
            ref={scrollRef}
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

      <div className="">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
};

export default ChatContainer;
