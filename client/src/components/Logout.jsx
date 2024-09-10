import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BiPowerOff } from "react-icons/bi";
import { logoutRoute } from "../utils/ApiRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(localStorage.getItem("chat-app-user"))._id;

    const data = await axios.get(`${logoutRoute}/${id}`);

    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <button
      className="flex justify-center algin-center p-2 rounded-lg border-none cursor-pointer bg-purple-900 text-xl text-red-300"
      onClick={handleClick}
    >
      <BiPowerOff />
    </button>
  );
}

// export default Logout;
