import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    fullname: "",
    sPanNo: "",
    address: "",
    phoneNo: "",
    shopName: "",
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken?.nameid);
      } catch (error) {
        toast.error("Invalid token, please log in again.");
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://localhost:7287/api/Auth/Profile/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userDataFromAPI = response?.data?.data[0];
      setUserData({
        email: userDataFromAPI.email || "",
        fullname: userDataFromAPI.fullname || "",
        sPanNo: userDataFromAPI.sPanNo || "",
        address: userDataFromAPI.address || "",
        phoneNo: userDataFromAPI.phoneNo || "",
        shopName: userDataFromAPI.shopName || "",
      });
    } catch (error) {
      toast.error("Error fetching user profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID not found.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      await axios.patch(
        `https://localhost:7287/api/Auth/Profile/${userId}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated successfully.");
      fetchUser(); // Refresh user data after update
    } catch (error) {
      toast.error("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg my-6">
      <div className="p-4">
        {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
      </div>
      <h2 className="text-xl text-slate-800 text-center">
        Update your profile
      </h2>
      <form onSubmit={updateProfile} className="space-y-4">
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
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fullname" className="text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={userData.fullname}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
