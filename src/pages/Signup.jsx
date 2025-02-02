import axios from "axios"; // for http requests
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName] = useState("");
  const [sPanNo, setsPanNo] = useState("");

  const navigate = useNavigate(); // to navigate in between routes

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !fullName || !sPanNo) {
      toast.error("All fields are required");
      return;
    }
    try {
      const response = await axios.post(
        "https://localhost:7287/api/Auth/register",
        {
          email,
          password,
          fullName,
          sPanNo,
        }
      );
      // console.log("Response:", response.data);

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        const errors = error.response.data;
        if (Array.isArray(errors)) {
          errors.forEach((err) => {
            toast.error(err.description);
          });
        } else {
          toast.error(error.response.data.message || "Something wrong");
        }
      } else {
        toast.error("Frontend Error");
      }
    }
  };
  return (
    <div className=" h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl px-16 py-10  rounded-xl">
        <h2 className="text-green-600 text-xl mb-2 text-center ">
          Welcome to HisabKitab
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // className='bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-500 outline-none required'
            className="bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-500 outline-none required focus:bg-white focus:ring-2 focus:ring-green-400  focus:outline-style"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-500 outline-none required focus:bg-white focus:ring-2 focus:ring-green-400  focus:outline-style"
          />
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            className="bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-500 outline-none required focus:bg-white focus:ring-2 focus:ring-green-400  focus:outline-style"
          />
          <input
            type="text"
            placeholder="Enter your pan number"
            value={sPanNo}
            onChange={(e) => setsPanNo(e.target.value)}
            className="bg-gray-300 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-500 outline-none required focus:bg-white focus:ring-2 focus:ring-green-400  focus:outline-style"
          />
          <button
            type="submit"
            className="bg-green-500 w-full text-white font-bold px-2 py-2 mb-2 rounded-lg hover:bg-green-700"
          >
            Sign up
          </button>
        </form>

        <Link to="/login" className="text-green-500 text-center block">
          Already Signup?
        </Link>
      </div>
    </div>
  );
};

export default Signup;
