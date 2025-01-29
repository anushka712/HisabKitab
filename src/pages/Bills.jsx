import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Bills = () => {
  const [billDate, setBillDate] = useState("");
  const [panNo, setPanNo] = useState("");
  const [billNo, setBillNO] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
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
        "http://localhost:7287/api/Bills",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
    }
  };
  

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            placeholder="Enter Bill Date"
            onChange={(e) => setBillDate(e.target.value)}
            value={billDate}
            className="px-2 py-2 rounded-lg border-2 border-slate-600"
            required
          />
          <input
            type="number"
            placeholder="Enter Pan Number"
            value={panNo}
            onChange={(e) => setPanNo(e.target.value)}
            className="px-2 py-2 rounded-lg border-2 border-slate-600"
            required
          />
          <input
            type="number"
            placeholder="Enter Bill Number"
            value={billNo}
            onChange={(e) => setBillNO(e.target.value)}
            className="px-2 py-2 rounded-lg border-2 border-slate-600"
            required
          />
          <select
            value={isPaid.toString()}
            onChange={(e) => setIsPaid(e.target.value === "true")}
            className="px-2 py-2 rounded-lg border-2 border-slate-600"
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
              className="px-2 py-2 rounded-lg border-2 border-slate-600"
              required
            />
          )}
          <input
            type="number"
            placeholder="Enter Total Amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="px-2 py-2 rounded-lg border-2 border-slate-600"
            required
          />
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="pl-8 relative z-0 mt-1 font-bold"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Bills;
