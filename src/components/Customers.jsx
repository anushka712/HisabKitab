import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FlatwareOutlinedIcon from "@mui/icons-material/FlatwareOutlined";
import LocalCafeOutlinedIcon from "@mui/icons-material/LocalCafeOutlined";
import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Customers = () => {
  return (
    <div
      id="customers"
      className="px-[10%] bg-gray-100  px-18 flex flex-col gap-10  h-screen md:h-[600px] justify-center items-center"
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: "16px" }}
        className="mb-5 text-[40px] font-extrabold text-green-600 "
      >
        Our Customers
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>
        We serve the diverse needs of the education industry, with a special
        focus on small to mid-sized education agencies. We provide a powerful
        CRM and partnerships portal for agents, a self-service platform for
        students, and an advanced recruitment platform for colleges.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            elevation={1}
            className="flex flex-col justify-center items-center h-[250px] gap-3 "
          >
            <FlatwareOutlinedIcon
              className="text-green-600"
              sx={{ fontSize: 60 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Groceries
            </Typography>
            <Typography
              className="text-center"
              sx={{ fontSize: "12px", marginTop: "6px" }}
            >
              Education Agencies use our CRM to manage students, colleges,
              courses, and admissions.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper className="flex flex-col justify-center items-center h-[250px] gap-3 ">
            <LocalCafeOutlinedIcon
              className="text-green-600"
              sx={{ fontSize: 60 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Small Shops
            </Typography>
            <Typography
              className="text-center"
              sx={{ fontSize: "12px", marginTop: "6px" }}
            >
              Education Agencies use our CRM to manage students, colleges,
              courses, and admissions.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper className="flex flex-col justify-center items-center h-[250px] gap-3 ">
            <BloodtypeOutlinedIcon
              className="text-green-600"
              sx={{ fontSize: 60 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Hospitals
            </Typography>
            <Typography
              className="text-center"
              sx={{ fontSize: "12px", marginTop: "6px" }}
            >
              Education Agencies use our CRM to manage students, colleges,
              courses, and admissions.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper className="flex flex-col justify-center items-center h-[250px] gap-3 ">
            <ShoppingCartOutlinedIcon
              className="text-green-500"
              sx={{ fontSize: 60 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Shopping Malls
            </Typography>
            <Typography
              className="text-center"
              sx={{ fontSize: "12px", marginTop: "6px" }}
            >
              Education Agencies use our CRM to manage students, colleges,
              courses, and admissions.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Customers;
