import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";



import { AccountCircleOutlined, Dashboard, Logout } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios";
import Notification from "./Notification";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opened = Boolean(anchorEl);
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken?.nameid);
      } catch (error) {
        toast.error(error);
      }
    }
  }, []);

  const fetchUser = async () => {
    if (!userId) return;
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://localhost:7287/api/Auth/Profile/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userDataFromAPI = response?.data?.data[0];
      setName(userDataFromAPI?.fullname);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  // methods
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("User logout succcessfully");
    navigate("/");
  };

  return (
    <Box display="flex" alignItems="center" gap={1} >
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={opened ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={opened ? "true" : undefined}
      >
        <h1 className="text-white pr-2 capitalize">{name}</h1>

        <Avatar src={name} sx={{ width: 32, height: 32 }}>
          {name?.charAt(0)?.toUpperCase()}
        </Avatar>
      </IconButton>
      <Notification/>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={opened}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/dashboard/user">
          <MenuItem>
            <ListItemIcon>
              <AccountCircleOutlined fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
