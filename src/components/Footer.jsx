import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";

const Footer = () => {
  return (
    <div className="h-40 bg-green-900 text-white">
      <Grid
        container
        spacing={3}
        className="flex h-full justify-center items-center"
      >
        <Grid size={{ xs: 12, sm: 4 }} className="text-center">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            HisabKitab
          </Typography>
          <Typography>Nepal's first overall SME System</Typography>{" "}
          <FacebookOutlinedIcon
            sx={{ fontSize: "30px" }}
            className="text-blue-600"
          />
          <SubscriptionsOutlinedIcon
            className="text-red-600"
            sx={{ fontSize: "30px" }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }} className="text-center">
          <Typography sx={{ fontWeight: "bold" }}>Policies</Typography>
          <Typography sx={{ fontSize: "12px" }}>
            {" "}
            Privacy Policy <br /> Terms & Conditions <br /> Data Agreement{" "}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography sx={{ fontSize: "14px" }}>
            Support and Downloads <br />
            You can always find our application in <br /> Apple Store and Goggle
            Play
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
