import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSearch, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Customer = () => {
  const [search, setSearch] = useState("");
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
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      toast.error("An error occurred while submitting the form.", error);
    }
  };

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
    }
  };

  //DELETE Customer
  const deleteCustomer = async (customerId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `https://localhost:7287/api/Customer/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response?.data?.message);
      setCustomers(
        customers.filter((customer) => customer.customerId !== customerId)
      );
      setLoading(false);
    } catch (error) {
      toast.error("Error deleting customer:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [pageNumber, pageSize, searchQuery]);

  return (
    <div className="md:ml-[20%] md:w-[80%] ">
      <div className="p-4">
        {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
      </div>
      <Container>
        <Box>
          <h2 className="mt-8 text-2xl text-center font-bold">Customers</h2>
          <div className=" flex justify-between">
            <div className="flex items-center justify-between border border-gray-300 rounded-md px-2 w-64 my-2 ">
              <input
                type="text"
                className="outline-none w-full pl-2 pr-8 py-1 text-gray-700"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="text-gray-500">
                <FaSearch size={20} />
              </button>
            </div>

            <div className="flex justify-between items-center mt-2 ">
              <button
                className="bg-green-700 text-white px-2 py-1 rounded-lg"
                onClick={() => setIsModelOpen(true)}
              >
                Add Customers
              </button>
            </div>
          </div>

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

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left font-bold">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-bold">
                    Phone
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-bold">
                    Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-bold">
                    Address
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr
                      key={customer.customerId}
                      className="odd:bg-white even:bg-gray-100"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {customer.customerName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {customer.phoneNumber}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {customer.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {customer.address}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <p className="flex gap-2">
                          <MdDelete
                            size={20}
                            className="text-red-600 cursor-pointer"
                            onClick={() => {
                              deleteCustomer(customer.customerId);
                            }}
                          />

                          <FaEdit
                            size={20}
                            className="text-green-700 cursor-pointer"
                          />
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

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
    </div>
  );
};

export default Customer;
