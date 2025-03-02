import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaSearch, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Button, Typography } from "@mui/material";
import Loader from "../components/Loader";

const Wholesellers = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModelOpen] = useState(false);

  const [wholeSellers, setWholeSellers] = useState([]);

  const [panNo, setPanNo] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [toPay, setToPay] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  //GET WholeSellers
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

  //POST WholeSellers
  const addWholeSellers = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      if (isEditMode) {
        const response = await axios.put(
          "https://localhost:7287/api/Wholesaler",
          {
            panNo,
            sellerName,
            address,
            phoneNo,
            toPay,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data.message);
        setIsModelOpen(false);

        if (response.data.statusCode === 200) {
          toast.success(response.data.message);
          setIsModelOpen(false);
          setPanNo("");
          setSellerName("");
          setAddress("");
          setPhoneNo("");
        }
      } else {
        const response = await axios.post(
          "https://localhost:7287/api/Wholesaler",
          {
            panNo,
            sellerName,
            address,
            phoneNo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data.message);
        setIsModelOpen(false);
        setPanNo("");
        setSellerName("");
        setAddress("");
        setPhoneNo("");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "An unexpected error occurred";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  //DELETE Wholesaler
  const deleteWholesaler = async (panNo) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `https://localhost:7287/api/Wholesaler/${panNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response?.data?.message);
      setWholeSellers(
        wholeSellers.filter((Wholesaler) => Wholesaler.panNo !== panNo)
      );
      setLoading(false);
    } catch (error) {
      toast.error("Error deleting Wholesaler:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (panNo) => {
    const wholesaler = wholeSellers.find((c) => c.panNo === panNo);
    setIsModelOpen(true);
    setIsEditMode(true);
    setPanNo(wholesaler.panNo);
    setSellerName(wholesaler.sellerName);
    setAddress(wholesaler.address);
    setPhoneNo(wholesaler.phoneNo);
    setToPay(wholesaler.toPay);
  };

  useEffect(() => {
    getwholesellers();
  }, []);

  return (
    <>
      {/* main div for wholesellers */}
      <div className="md:ml-[20%] md:w-[80%] px-8">
        <div className="p-4">
          {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
        </div>
        <h2 className="mt-8 text-2xl text-center font-bold">Wholesalers</h2>
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
              Add Wholesalers
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white py-6 px-12 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold text-center mb-4">
                {isEditMode ? "Edit Wholesaler" : "Add New Wholesaler"}
              </h2>

              {/* form start */}
              <div>
                <form onSubmit={addWholeSellers}>
                  <input
                    type="text"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                    placeholder="Enter the Pan No:"
                    value={panNo}
                    onChange={(e) => setPanNo(e.target.value)}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Enter seller name"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Address"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {isEditMode && (
                    <input
                      type="text"
                      placeholder="toPay"
                      className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                      value={toPay}
                      onChange={(e) => setToPay(e.target.value)}
                    />
                  )}
                  <br />
                  <input
                    type="text"
                    placeholder="Phone No:"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
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

        <div>
          <table className="w-full text-sm text-left ">
            <thead className="text-xs border border-black text-black uppercase ">
              <tr>
                <th className="border border-gray-300 p-2 text-left py-4">
                  Pan No:
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Seller Name
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Address
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Phone No
                </th>
                <th className="border border-gray-300 p-2 text-left">To Pay</th>
                <th className="border border-gray-300 p-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {wholeSellers.length > 0 ? (
                wholeSellers.map((wholeSeller, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-100">
                    <td className="border border-gray-300 p-2">
                      {wholeSeller.panNo}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {wholeSeller.sellerName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {wholeSeller.address}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {wholeSeller.phoneNo}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {wholeSeller.toPay}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <p className="flex gap-2">
                        <MdDelete
                          size={20}
                          className="text-red-600 cursor-pointer"
                          onClick={() => {
                            deleteWholesaler(wholeSeller.panNo);
                          }}
                        />
                        <FaEdit
                          size={20}
                          className="text-green-700 cursor-pointer"
                          onClick={() => {
                            handleEdit(wholeSeller.panNo);
                          }}
                        />
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No Wholesellers found.
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
      </div>
    </>
  );
};

export default Wholesellers;
