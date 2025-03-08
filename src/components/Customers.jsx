import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

const Customers = () => {
  return (
    <div
      id="customers"
      className="px-[10%] bg-gray-100 px-18 flex flex-col gap-10 h-screen md:h-[600px] justify-center items-center"
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: "16px" }}
        className="mb-5 text-[40px] font-extrabold text-green-600"
      >
        Our Customers
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>
        Our system helps businesses track sales, manage inventory, and predict
        future demand. We cater to small retailers, wholesalers, and businesses
        that need efficient stock and sales management.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            elevation={1}
            className="flex flex-col justify-center items-center h-[250px] gap-3 "
          >
            <StorefrontOutlinedIcon
              className="text-green-600"
              sx={{ fontSize: 60 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Small Retailers
            </Typography>
            <Typography
              className="text-center"
              sx={{ fontSize: "12px", marginTop: "6px" }}
            >
              Manage daily sales, track inventory, and get insights into
              top-selling products.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper className="flex flex-col justify-center items-center h-[250px] gap-3 ">
            <WarehouseOutlinedIcon
              className="text-green-600"
              sx={{ fontSize: 60 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Wholesalers
            </Typography>
            <Typography
              className="text-center"
              sx={{ fontSize: "12px", marginTop: "6px" }}
            >
              Keep track of bulk sales, manage stock levels, and forecast
              demand.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper className="flex flex-col justify-center items-center h-[250px] gap-3 ">
            <ShoppingCartOutlinedIcon
              className="text-green-600"
              sx={{ fontSize: 60 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Supermarkets
            </Typography>
            <Typography
              className="text-center"
              sx={{ fontSize: "12px", marginTop: "6px" }}
            >
              Automate stock tracking, reduce waste, and optimize product
              availability.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper className="flex flex-col justify-center items-center h-[250px] gap-3 ">
            <TrendingUpOutlinedIcon
              className="text-green-500"
              sx={{ fontSize: 60 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Business Owners
            </Typography>
            <Typography
              className="text-center"
              sx={{ fontSize: "12px", marginTop: "6px" }}
            >
              Analyze profit/loss trends and make data-driven business
              decisions.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Customers;
