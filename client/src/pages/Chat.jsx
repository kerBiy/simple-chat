import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/ApiRoutes";
import { io } from "socket.io-client";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer.jsx";
import { FaBars } from "react-icons/fa"; // Import an icon for the mobile toggle button

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showContacts, setShowContacts] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(
            `${allUsersRoute}/${currentUser._id}`
          );
          setContacts(data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setShowContacts(false);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex relative">
      <button
        className={`absolute top-5 left-2 md:hidden z-20 p-4 text-2xl bg-transparent cursor-pointer text-white rounded-md focus:outline-none ${
          showContacts ? "hidden" : "block"
        }`}
        onClick={() => setShowContacts(!showContacts)}
      >
        <FaBars />
      </button>

      <div
        className={`h-screen w-full md:w-1/3 lg:1-4 md:block ${
          showContacts ? "block" : "hidden"
        }`}
      >
        <Contacts contacts={contacts} changeChat={handleChatChange} />
      </div>

      <div
        className={`w-full md:w-2/3 lg:w-3/4 h-screen md:block ${
          showContacts ? "hidden" : "block"
        }`}
      >
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
};

export default Chat;
