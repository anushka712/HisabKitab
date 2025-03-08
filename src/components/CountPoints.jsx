import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CountPoints = () => {
  const [customers, setCustomers] = React.useState([]);
  const [wholeSellers, setWholeSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  //GET Customers
  const fetchCustomers = async (searchQuery, pageNumber, pageSize) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("https://localhost:7287/api/Customer", {
        params: {
          SearchQuery: searchQuery,
          PageNumber: pageNumber,
          PageSize: pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(response?.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching customers:", error.response || error.message);
      if (error.response?.status === 400) {
        toast.error("Bad Request: Check query parameters or data format.");
      }
    } finally {
      setLoading(false);
    }
  };

  //GET Wholesellers
  const getwholesellers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://localhost:7287/api/Wholesaler",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.statusCode === 200) {
        setLoading(false);
        setWholeSellers(response.data.data);
      } else if (response.data.statusCode === 400) {
        toast.error(`Error: ${response?.data?.message}`);
      } else {
        toast.error("Failed to fetch data: " + response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error("No response from the server.");
      } else {
        toast.error("Error fetching data: " + error.message);
      }
    }
  };

  //Get Product
  const getProduct = async (pageNumber, pageSize, searchQuery) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("https://localhost:7287/api/Product", {
        params: {
          PageNumber: pageNumber,
          PageSize: pageSize,
          SearchQuery: searchQuery,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response?.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching customers:", error.response || error.message);
      if (error.response?.status === 400) {
        toast.error("Bad Request: Check query parameters or data format.");
      }
    } finally {
      setLoading(false);
    }
  };

  //Fetch Notification
  const fetchNotification = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://localhost:7287/api/LowStockNotification`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response?.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const totalToReceive = customers?.reduce(
    (sum, customer) => sum + (customer?.toReceive || 0),
    0
  );

  const totalToPay = wholeSellers?.reduce(
    (sum, seller) => sum + (seller?.toPay || 0),
    0
  );

  const totalProducts = products?.length;

  const totalNotifications = notifications?.length;

  useEffect(() => {
    fetchCustomers();
    getwholesellers();
    getProduct();
    fetchNotification();
  }, []);

  return (
    <>
      <div className="p-4">
        {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
      </div>
      <Grid container spacing={3} my={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Link to="/dashboard/customers">
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
                    sx={{
                      backgroundColor: "green",
                      px: 1,
                      borderRadius: "8px",
                    }}
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
                  {totalToReceive}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total To Receive Money
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Link to="/dashboard/wholesellers">
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
                  {totalToPay}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total To Pay Money
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Link to="/dashboard/stock">
            <Card sx={{ height: "130px", boxShadow: 3 }}>
              <CardContent sx={{ padding: "16px" }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontWeight="medium"
                  >
                    Total Products
                  </Typography>
                  <Typography
                    variant="body2"
                    color="white"
                    sx={{
                      backgroundColor: "green",
                      px: 1,
                      borderRadius: "8px",
                    }}
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
                  {totalProducts}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Your Stock Products
                </Typography>
              </CardContent>
            </Card>
          </Link>
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
                {totalNotifications}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Low Stock Products
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
