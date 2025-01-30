import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    email: "",
    fullName: "",
    sPanNo: "",
    address: "",
    phoneNo: "",
    shopName: "",
  });
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.nameid);
        setUserData((prevState) => ({
          ...prevState,
          email: decodedToken.email,
        }));
      } catch (error) {
        toast.error("Invalid token:", error);
      }
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID not found.");
      return;
    }

    try {
      const response = await axios.patch(
        `https://localhost:7287/api/Auth/Profile/${userId}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.log("User updated successfully:", response.message);
    } catch (error) {
      toast.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg my-2">
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fullName" className="text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
            required
            className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="sPanNo" className="text-gray-600">
            PAN Number
          </label>
          <input
            type="text"
            id="sPanNo"
            name="sPanNo"
            value={userData.sPanNo}
            onChange={handleChange}
            required
            className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-600">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            required
            className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNo" className="text-gray-600">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            value={userData.phoneNo}
            onChange={handleChange}
            required
            className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="shopName" className="text-gray-600">
            Shop Name
          </label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            value={userData.shopName}
            onChange={handleChange}
            required
            className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
