import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../components/Loader";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }
    try {
      const response = await axios.post(
        "https://localhost:7287/api/Auth/login",
        {
          email,
          password,
        }
      );

      //console.log(response.data)

      if (response.status === 200) {
        toast.success("User Login successfully.");

        const token = response.data.token;
        localStorage.setItem("authToken", token);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.message &&
        error.response.data.message
      ) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occured!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center p-6">
      <div className="p-4">
        {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
      </div>
      <div className="bg-white shadow-2xl px-16 py-10  rounded-xl">
        <h2 className="text-green-600 text-xl mb-2 text-center">
          Welcome to HisabKitab
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-500 outline-none required focus:bg-white focus:ring-2 focus:ring-green-400 focus:outline-style: solid;"
          />
          <div className="relative mb-4">
            <input
              placeholder="Password"
              type={isPasswordVisible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-500 outline-none required focus:bg-white focus:ring-2 focus:ring-green-400  focus:outline-style: solid;"
            />
            <p
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/3 transform -translate-y-1/2  text-black "
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </p>
          </div>

          <button
            type="submit"
            className="bg-green-500 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-500 outline-none hover:bg-green-700 required focus:bg-gray-100 focus:border-blue-700 focus:outline-style: solid ;"
          >
            Login
          </button>
        </form>

        <Link to="/signup" className="text-green-500">
          Sign-Up?
        </Link>
      </div>
    </div>
  );
}

export default Login;
