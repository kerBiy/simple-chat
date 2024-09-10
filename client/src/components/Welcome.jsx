import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";

const Welcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      setUserName(user.username);
    };
    fetchUsername();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 w-full h-full gap-2">
      <img src={Robot} alt="Welcome Robot" className="w-96 mx-auto" />
      <h1 className="text-2xl sm:text-3xl font-bold text-white">
        Welcome, {userName}!
      </h1>
      <h3 className="text-md text-center sm:text-lg text-gray-400">
        Please select a chat to start messaging.
      </h3>
    </div>
  );
};

export default Welcome;
