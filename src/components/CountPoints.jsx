import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const CountPoints = () => {

  return (
    <Grid container spacing={3} my={2}>
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: "130px", boxShadow: 3 }}>
          <CardContent sx={{ padding: "16px" }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography
                variant="body2"
                color="text.primary"
                fontWeight="medium"
              >
                To Receive
              </Typography>
              <Typography
                variant="body2"
                color="white"
                sx={{ backgroundColor: "green", px: 1, borderRadius: "8px" }}
              >
                +12%
              </Typography>
            </Box>
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight="bold"
              py={1}
            >
              1000
            </Typography>
            <Typography variant="caption" color="text.secondary">
             Total To Receive Money
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: "130px", boxShadow: 3 }}>
          <CardContent sx={{ padding: "16px" }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography
                variant="body2"
                color="text.primary"
                fontWeight="medium"
              >
                TO Pay
              </Typography>
              <Typography
                variant="body2"
                color="white"
                sx={{ backgroundColor: "red", px: 1, borderRadius: "8px" }}
              >
                -1.5%
              </Typography>
            </Box>
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight="bold"
              py={1}
            >
              500
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total to pay Money
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: "130px", boxShadow: 3 }}>
          <CardContent sx={{ padding: "16px" }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography
                variant="body2"
                color="text.primary"
                fontWeight="medium"
              >
               Products
              </Typography>
              <Typography
                variant="body2"
                color="white"
                sx={{ backgroundColor: "green", px: 1, borderRadius: "8px" }}
              >
                +5.5%
              </Typography>
            </Box>
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight="bold"
              py={1}
            >
              700
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Products
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: "130px", boxShadow: 3 }}>
          <CardContent sx={{ padding: "16px" }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography
                variant="body2"
                color="text.primary"
                fontWeight="medium"
              >
                Low Stock Products
              </Typography>
              <Typography
                variant="body2"
                color="white"
                sx={{ backgroundColor: "red", px: 1, borderRadius: "8px" }}
              >
                3%
              </Typography>
            </Box>
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight="bold"
              py={1}
            >
              12
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total 12 low stock products
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
