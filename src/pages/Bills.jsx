import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaSearch, FaEdit } from "react-icons/fa";
import axios from "axios";
import Loader from "../components/Loader";
import { Box, Typography, Button } from "@mui/material";
import { MdDelete } from "react-icons/md";

const Bills = () => {
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [bills, setBills] = useState([]);

  const [billDate, setBillDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [panNo, setPanNo] = useState("");
  const [billNo, setBillNO] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [isModalOpen, setIsModelOpen] = useState(false);

  //POST Bills
  const postBill = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (
      !billDate ||
      !panNo ||
      !billNo ||
      !totalAmount ||
      (isPaid && !paidAmount)
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("billDate", billDate);
    formData.append("panNo", panNo);
    formData.append("billNo", billNo);
    formData.append("isPaid", isPaid);
    if (isPaid) formData.append("paidAmount", paidAmount);
    formData.append("totalAmount", totalAmount);
    if (selectedImage) formData.append("File", selectedImage);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://localhost:7287/api/Bills",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Bill added successfully!");
        setBillDate("");
        setPanNo("");
        setBillNO("");
        setIsPaid(false);
        setPaidAmount("");
        setTotalAmount("");
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error adding bill:", error);
      toast.error("Failed to add bill. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  //GET Bills
  const fetchBills = async (pageNumber, pageSize, searchQuery) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("https://localhost:7287/api/Bills", {
        params: {
          PageNumber: pageNumber,
          PageSize: pageSize,
          SearchQuery: searchQuery,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBills(response?.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching customers:", error.response || error.message);
      if (error.response?.status === 400) {
        toast.error("Bad Request: Check query parameters or data format.");
      }
    }
  };

  //DELETE Bills
  const deleteBills = async (BillId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`https://localhost:7287/api/Bills/${BillId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBills(bills.filter((bill) => bill.BillId !== BillId));
      setLoading(false);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [pageNumber, pageSize, searchQuery]);

  return (
    <div className="mt-4 md:ml-[20%] md:w-[80%] px-10">
      <div className="p-4">
        {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
      </div>
      <h2 className="text-xl text-slate-800 text-center mb-2">
        Upload Your Bills here
      </h2>

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
            Add Bill
          </button>
        </div>
      </div>

      {/* Bill Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white py-6 px-12 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-center">
              Add a New Bill
            </h2>

            {/* Form Start */}
            <div>
              <form onSubmit={postBill}>
                <input
                  type="date"
                  placeholder="Enter Bill Date"
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  required
                />
                <br />
                <input
                  type="number"
                  placeholder="Enter Pan Number"
                  value={panNo}
                  onChange={(e) => setPanNo(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  required
                />
                <br />
                <input
                  type="number"
                  placeholder="Enter Bill Number"
                  value={billNo}
                  onChange={(e) => setBillNO(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  required
                />
                <br />
                <select
                  value={isPaid.toString()}
                  onChange={(e) => setIsPaid(e.target.value === "true")}
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                >
                  <option value="true">Paid</option>
                  <option value="false">Unpaid</option>
                </select>
                {isPaid && (
                  <input
                    type="number"
                    placeholder="Enter Paid Amount"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                    required
                  />
                )}
                <br />
                <input
                  type="number"
                  placeholder="Enter Total Amount"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  required
                />
                <br />

                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
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
                    Add
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
                Bill Date
              </th>
              <th className="border border-gray-300 p-2 text-left">Bill No</th>
              <th className="border border-gray-300 p-2 text-left">Is Paid</th>
              <th className="border border-gray-300 p-2 text-left">
                Paid Amount
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Total Amount
              </th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.length > 0 ? (
              bills.map((bills, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{bills.panNo}</td>
                  <td className="border border-gray-300 p-2">
                    {bills.billDate}
                  </td>
                  <td className="border border-gray-300 p-2">{bills.billNo}</td>
                  <td className="border border-gray-300 p-2">{bills.isPaid}</td>
                  <td className="border border-gray-300 p-2">
                    {bills.totalAmount}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {bills.paidAmount}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <p className="flex gap-2">
                      <MdDelete
                        size={20}
                        className="text-red-600 cursor-pointer"
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
                  colSpan={7}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  No Bill found.
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
  );
};

export default Bills;
