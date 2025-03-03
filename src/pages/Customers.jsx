import { useState, useEffect } from "react";
import { FaSearch, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Box, Container, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Customer = () => {
  const [openQR, setOpenQR] = useState(false);
  

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cPanNo, setCPanNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModelOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  //POST customers
  const postCustomers = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      if (isEditMode) {
        const response = await axios.put(
          "https://localhost:7287/api/Customer",
          {
            customerId,
            phoneNumber,
            email,
            address,
            customerName,
            cPanNo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response?.data?.message);
        setLoading(false);
        setIsModelOpen(false);
      } else {
        const response = await axios.post(
          "https://localhost:7287/api/Customer",
          { customerName, phoneNumber, email, address, cPanNo },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response?.data?.message);
        setLoading(false);
        setIsModelOpen(false);
        setCustomerName("");
        setPhoneNumber("");
        setEmail("");
        setAddress("");
        setCPanNo("cPanNo", "12");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

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
  }, []);

  const handleEdit = (customerId) => {
    const customer = customers.find((c) => c.customerId === customerId);
    console.log(customer);
    setIsModelOpen(true);
    setIsEditMode(true);
    setCustomerId(customer?.customerId);
    setCustomerName(customer?.customerName);
    setPhoneNumber(customer?.phoneNumber);
    setEmail(customer?.email);
    setAddress(customer?.address);
    setCPanNo("12");
  };

  return (
    <div className="md:ml-[20%] md:w-[80%] ">
      <div className="p-4">
        {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
      </div>

      <Container>
        <Box>
          <h2 className="text-xl text-slate-800 text-center mb-2">Customers</h2>
          <div className=" flex justify-between">
            <div className="flex items-center justify-between border border-gray-300 rounded-md px-2 w-64 my-2 ">
              <input
                type="text"
                className="outline-none w-full pl-2 pr-8 py-1 text-gray-700"
                placeholder="Search..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="text-gray-500">
                <FaSearch size={20} />
              </button>
            </div>

            <div className="flex justify-between items-center mt-2 ">
              <button
                className="bg-green-700 text-white px-2 py-1 rounded-lg"
                onClick={() => {
                  setIsModelOpen(true);
                  setIsEditMode(false);
                }}
              >
                Add Customers
              </button>
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white py-6 px-12 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold text-center mb-4">
                  {isEditMode ? "Edit Customer" : "Add New Customer"}
                </h2>
                {/* form start */}
                <div>
                  <form onSubmit={postCustomers}>
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                      placeholder="Enter the Customer Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <br />

                    <input
                      type="text"
                      placeholder="Address"
                      className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="email"
                      className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Enter Phone Number"
                      className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Pan No:"
                      className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                      value={cPanNo}
                      onChange={(e) => setCPanNo(e.target.value)}
                    />
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        onClick={() => setIsModelOpen(false)}
                        className="bg-red-500 px-4 py-2 rounded text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-green-800 text-white px-4 py-2 rounded"
                      >
                        {isEditMode ? "Update" : "Add"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
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
                    To Receive
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
                        {customer.toReceive}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex items-center gap-2">
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
                            onClick={() => {
                              handleEdit(customer.customerId);
                            }}
                          />
                        </div>
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
