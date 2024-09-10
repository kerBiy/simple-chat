import { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";

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
        <div className="bg-gray-900 bg-opacity-60 backdrop-blur-md border border-gray-800 shadow-lg rounded-lg p-6 min-h-screen w-full flex flex-col gap-12">
          <div className="flex items-center justify-center gap-4">
            <img src={Logo} alt="SimpleChat Logo" className="w-12 h-12" />
            <h3 className="text-2xl font-semibold text-white">SimpleChat</h3>
          </div>

          <div className="flex flex-col gap-4">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                onClick={() => changeCurrentChat(index, contact)}
                className={`flex items-center gap-4 rounded-lg cursor-pointer  transition-transform duration-300 hover:scale-105 ${
                  currentSelected === index
                    ? "bg-blue-600"
                    : "bg-transparent hover:bg-gray-700 "
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt="avatar"
                  className="w-12 rounded-full"
                />

                <h3 className="text-white text-lg font-medium">
                  {contact.username}
                </h3>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <img
              className="w-12"
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
            <h2 className="text-lg font-semibold text-white">
              {currentUserName}
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
