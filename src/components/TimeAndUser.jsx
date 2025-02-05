import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Grid, Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";

export const TimeAndUser = () => {
   const token = localStorage.getItem("authToken");
   const decodedToken = jwtDecode(token);
  const [time, setTime] = React.useState("");
  const [greeting, setGreeting] = React.useState("Good Morning");

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  const getGreeting = (hours) => {
    if (hours >= 1 && hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 17) return "Good Afternoon";
    return "Good Evening";
  };

  React.useEffect(() => {
    const updateGreetingAndTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const formattedTime = formatTime(currentTime);
      const greetingMessage = getGreeting(currentHour);

      setTime(formattedTime);
      setGreeting(greetingMessage);
    };

    updateGreetingAndTime();

    const interval = setInterval(updateGreetingAndTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid
      backgroundColor="blue"
      item
      xs={12}
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        background: "linear-gradient(to right, #1E3A8A, #3B82F6)",
        // borderRadius: "8px",
        padding: "16px",
        height: "20vh",
      }}
    >
      <Grid item>
        <Box display="flex" sx={{ color: "white" }} alignItems="center" gap={1}>
          <Box>
            <LightModeIcon sx={{ color: "yellow" }} />
          </Box>
          <Box>
            {greeting}, {decodedToken?.unique_name[1]}! <br />
            Welcome back to the dashboard
          </Box>
        </Box>
      </Grid>

      <Grid item>
        <Box
          display="flex"
          gap={1}
          sx={{
            color: "white",
            border: "2px solid #B0B0B0",
            backgroundColor: "#2C6D34",
            borderRadius: "5px",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Box>🕒</Box>
          <Box>{time}</Box>
        </Box>
      </Grid>
    </Grid>
  );
};
