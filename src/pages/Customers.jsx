import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModelOpen] = useState(false);

  //Form data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //POST customers
  const postCustomers = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://localhost:7287/api/Customer",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Customer data submitted successfully!");
      setIsModelOpen(false);
    } catch (error) {
      toast.error("An error occurred while submitting the form.", error);
    }
  };


  //GET Customers
  const fetchCustomers = async (pageNumber, pageSize, searchQuery) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("https://localhost:7287/api/Customer", {
        params: {
          PageNumber: pageNumber,
          PageSize: pageSize,
          SearchQuery: searchQuery,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
// console.log("Response Data:", response?.data?.data[0]?.customerName);
      setCustomers(response?.data?.data);
    } catch (error) {
      toast.error("Error fetching customers:", error.response || error.message);
      if (error.response?.status === 400) {
        toast.error("Bad Request: Check query parameters or data format.");
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [pageNumber, pageSize, searchQuery]);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          margin: "2rem 0",
          padding: "2rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Customer List
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <TextField
            label="Search"
            className="text-red-200"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={fetchCustomers}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </Button>
          <Button variant="contained" onClick={() => setIsModelOpen(true)}>
            Add Customers
          </Button>
        </Box>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <Container maxWidth="sm">
              <Box
                sx={{
                  padding: "2rem",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h4" gutterBottom textAlign="center">
                  Customer Form
                </Typography>
                <form onSubmit={handleSubmit(postCustomers)}>
                  <Grid container spacing={2}>
                    {/* Customer Name */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Customer Name"
                        variant="outlined"
                        {...register("customerName", {
                          required: "Customer Name is required",
                        })}
                        error={!!errors.customerName}
                        helperText={errors.customerName?.message}
                      />
                    </Grid>

                    {/* Phone Number */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        {...register("phoneNumber", {
                          required: "Phone Number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Phone Number must be 10 digits",
                          },
                        })}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                      />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Enter a valid email address",
                          },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        multiline
                        rows={4}
                        {...register("address", {
                          required: "Address is required",
                        })}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ textAlign: "center", marginTop: "1.5rem" }}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                    <Button
                      variant="contained"
                      color="danger"
                      onClick={() => setIsModelOpen(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </Box>
            </Container>
          </div>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Phone</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell>
                  <b>Address</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.customerName}</TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1 || loading}
          >
            Previous
          </Button>
          <Typography>Page {pageNumber}</Typography>
          <Button
            variant="outlined"
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={loading}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Customer;
