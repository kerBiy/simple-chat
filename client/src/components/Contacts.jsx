import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";

const Contacts = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchContact = async () => {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    fetchContact();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="bg-gray-900 bg-opacity-60 backdrop-blur-md border border-gray-800 shadow-lg rounded-lg py-6 h-screen w-full flex flex-col gap-8 ">
          <h3 className="text-2xl font-semibold text-white tracking-widest text-center my-2">
            Simple<span className="text-teal-400">Chat</span>
          </h3>

          <div className="flex flex-col gap-4 overflow-y-auto px-6">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                onClick={() => changeCurrentChat(index, contact)}
                className={`flex items-center gap-4 p-2 rounded-xl cursor-pointer z-10 transition-transform duration-300 hover:scale-105 ${
                  currentSelected === index
                    ? "bg-teal-400"
                    : "bg-gray-800 hover:bg-gray-700 "
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt="avatar"
                  className="w-12"
                />

                <h3 className="text-white text-lg">{contact.username}</h3>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-gray-800 p-2 rounded-lg mx-4">
            <div className="flex items-center gap-4">
              <Link to="/setAvatar">
                <img
                  className="w-14 transition-transform duration-300 hover:scale-105"
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </Link>

              <h2 className="text-xl font-semibold text-white">
                {currentUserName}
              </h2>
            </div>

            <Logout />
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
