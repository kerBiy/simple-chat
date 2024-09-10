import { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
      <div className="relative">
        <BsEmojiSmileFill
          className="text-2xl text-gray-300 cursor-pointer hover:text-teal-400 transition duration-150"
          onClick={handleEmojiPickerhideShow}
        />
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0">
            <Picker onEmojiClick={handleEmojiClick} theme="dark" />
          </div>
        )}
      </div>

      <form
        className="flex items-center w-full bg-gray-700 rounded-3xl"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          placeholder="Type your message here"
          className="w-full p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button
          type="submit"
          className="p-3 bg-teal-500 text-white rounded-r-3xl hover:bg-teal-600 transition duration-150"
        >
          <IoMdSend className="text-xl" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
