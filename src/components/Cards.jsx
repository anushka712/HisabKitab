import React from "react";
import { Grid, Paper } from "@mui/material";
import { StorefrontOutlined, Group } from "@mui/icons-material";
import CountCard from "./CountCard";
import { Link } from "react-router-dom";

export const Card = () => {
  const dashboardData = [
    {
      label: "Wholesellers",
      value: 4,
      icon: StorefrontOutlined,
      iconBgColor: "orange",
      link: "/dashboard/wholesellers",
    },
    {
      label: "Customers",
      value: 5,
      icon: Group,
      iconBgColor: "#D81B60",
      link: "/dashboard/customers",
    },
  ];

  return (
    <Paper
      padding={5}
      elevation={2}
      sx={{
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Grid
        padding={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "18px",
          width: "100%",
        }}
      >
        {dashboardData?.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            style={{ textDecoration: "none", color: "inherit" }} // Removes default link styling
          >
            <Paper elevation={2} sx={{ cursor: "pointer", padding: 2 }}>
              <CountCard
                label={item.label}
                value={item.value}
                icon={item.icon}
                iconBgColor={item.iconBgColor}
              />
            </Paper>
          </Link>
        ))}
      </Grid>
    </Paper>
  );
};
