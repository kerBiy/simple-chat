import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/ApiRoutes";

import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer.jsx";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };
    fetchCurrentUser();
  }, [navigate]);

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
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex">
      <div className="w-1/4 h-screen">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
      </div>

      <div className="w-3/4 h-screen">
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} />
        )}
      </div>
    </div>
  );
};

export default Chat;
