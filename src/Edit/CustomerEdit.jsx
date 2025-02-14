import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  DialogTitle,
  Typography,
  Box,
  Grid,
  Container,
} from "@mui/material";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const CustomerEdit = ({ open, onClose, customerId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  //GET Customers
  const fetchCustomers = async (pageNumber, pageSize, searchQuery) => {
    setLoading(true);
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

  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <div>
      <div className="p-4">
        {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
      </div>
      <IconButton onClick={() => setOpen(true)}>
        <FaEdit size={20} className="text-green-600 cursor-pointer" />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogContent style={{ textAlign: "center", padding: "20px" }}>
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
              <form>
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
                      defaultChecked={customers?.customerName}
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

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="PAN N0"
                      variant="outlined"
                      {...register("cPanNo", {
                        required: "PAN Number is required",
                      })}
                      error={!!errors.cPanNo}
                      helperText={errors.cPanNo?.message}
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
              </form>
            </Box>
          </Container>
        </DialogContent>

        <IconButton sx={{ display: "block", mx: "auto" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button variant="contained" color="success">
              Update
            </Button>
          </Box>
        </IconButton>
      </Dialog>
    </div>
  );
};

export default CustomerEdit;
