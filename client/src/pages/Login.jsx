import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginRoute } from "../utils/ApiRoutes";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8">
        <form
          className="bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-xs sm:max-w-md"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="text-center mb-12 flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wider">
              Simple<span className="text-teal-400">Chat</span>
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm">
              Connect with friends in a futuristic way
            </p>
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full mb-3 sm:mb-4 p-3 sm:p-4 bg-transparent border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-150 placeholder-gray-400"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-3 sm:mb-4 p-3 sm:p-4 bg-transparent border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-150 placeholder-gray-400"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg shadow-lg transition duration-150"
          >
            Log In
          </button>

          <span className="block text-center mt-4 text-gray-300 text-xs sm:text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-teal-400 hover:text-teal-500 transition duration-150"
            >
              Create one.
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
