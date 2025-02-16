import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import { DarkModeOutlined } from "@mui/icons-material";
import { AccountCircleOutlined, Logout } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const UserMenu = () => {
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const name = decodedToken?.given_name;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opened = Boolean(anchorEl);


  const navigate = useNavigate();

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
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={opened ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={opened ? "true" : undefined}
      >
        <Avatar src={name} sx={{ width: 32, height: 32 }}>
          {name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <h1 className="text-white pl-2 capitalize">{name}</h1>
      </IconButton>

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
