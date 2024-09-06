import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerRoute } from "../utils/ApiRoutes";
import Logo from "../assets/logo.svg";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 4) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-950 px-4 sm:px-6 lg:px-8">
        <form
          className="bg-gray-900 bg-opacity-60 backdrop-blur-md border border-gray-800 shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-xs sm:max-w-md"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="text-center mb-6">
            <img className="w-12 sm:w-16 mx-auto mb-4" src={Logo} alt="Logo" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              SimpleChat
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Connect with friends in a futuristic way
            </p>
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full mb-3 sm:mb-4 p-3 sm:p-4 bg-transparent border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 placeholder-gray-500"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-3 sm:mb-4 p-3 sm:p-4 bg-transparent border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 placeholder-gray-500"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-3 sm:mb-4 p-3 sm:p-4 bg-transparent border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 placeholder-gray-500"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full mb-3 sm:mb-4 p-3 sm:p-4 bg-transparent border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 placeholder-gray-500"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition duration-150"
          >
            Create Account
          </button>

          <span className="block text-center mt-4 text-gray-400 text-xs sm:text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-500 transition duration-150"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
