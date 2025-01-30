import React from "react";

import { Box } from "@mui/material";

const CountCard = ({
  label,
  value,
  link,
  icon: Icon,
  iconBgColor = "#C2185B",
  iconColor = "white",
}) => {
  return (
    <Box display="flex" flexDirection="column" p={4} borderRadius={2}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <p className="text-3xl font-medium text-slate-700">{value}</p>

        {Icon && (
          <Box
            sx={{
              bgcolor: iconBgColor,
              color: "white",
              borderRadius: "8px",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon sx={{ fontSize: "24px", color: iconColor }} />
          </Box>
        )}
      </Box>
      <p className=" text-xl font-medium text-gray-500">{label}</p>
    </Box>
  );
};

export default CountCard;
