import React, { useCallback, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import image from "../assets/bill.png";
import { toast } from "react-toastify";
import axios from "axios";

const Bills = () => {
  const [textResult, setTextResult] = useState("");
  const [filteredResult, setFilteredResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Initializing Bill Inputs
  const [billDate, setBillDate] = useState("");
  const [panNo, setPanNo] = useState("");
  const [billNo, setBillNO] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const worker = createWorker();

  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return;
    setLoading(true);
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const { data } = await worker.recognize(selectedImage);

    setTextResult(data.text); // Set the full OCR text
    filterText(data.text); // Filter the text immediately
    setLoading(false);
  }, [selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText]);

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult("");
      setFilteredResult("");
    }
  };

  const handleTextChange = (e) => {
    const updatedText = e.target.value;
    setTextResult(updatedText); // Update the full text
    filterText(updatedText); // Filter the updated text
  };

  const filterText = (text) => {
    const keyword = "Split the text";
    const lines = text.split("\n"); // Split text into lines
    const matchedLines = lines.filter((line) =>
      line.toLowerCase().includes(keyword.toLowerCase())
    );

    if (matchedLines.length > 0) {
      setFilteredResult(matchedLines.join("\n")); // Join matched lines into a single string
    } else {
      setFilteredResult("Cannot detect"); // Set default message if no matches are found
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !billDate ||
      !panNo ||
      !billNo ||
      !totalAmount ||
      (isPaid && !paidAmount)
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("billDate", billDate);
    formData.append("panNo", panNo);
    formData.append("billNo", billNo);
    formData.append("isPaid", isPaid === "true");
    if (isPaid) formData.append("paidAmount", paidAmount);
    formData.append("totalAmount", totalAmount);
    formData.append("image", selectedImage);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://localhost:7287/api/Bills",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Bill added successfully!");
        // Reset form fields
        setBillDate("");
        setPanNo("");
        setBillNO("");
        setIsPaid(false);
        setPaidAmount("");
        setTotalAmount("");
        setSelectedImage(null);
      }

      //console.log(response.data)
    } catch (error) {
      console.error("Error adding bill:", error);
      alert("Failed to add bill. Please try again.");
    }
  };

  return (
    <>
      <div className="mt-4">
        <form action="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              placeholder="Please Enter Bill Date"
              onChange={(e) => setBillDate(e.target.value)}
              value={billDate}
              className="px-2 py-2   rounded-lg  border-2 border-slate-600  required"
            />
            <input
              type="number"
              placeholder="Please Enter Pan Number"
              value={panNo}
              onChange={(e) => setPanNo(e.target.value)}
              className="px-2 py-2   rounded-lg  border-2 border-slate-600  required"
            />
            <input
              type="number"
              placeholder="Please Enter Bill Number"
              value={billNo}
              onChange={(e) => setBillNO(e.target.value)}
              className="px-2 py-2   rounded-lg  border-2 border-slate-600  required"
            />

            <select
              value={isPaid}
              onChange={(e) => setIsPaid(e.target.value)}
              className="px-2 py-2 rounded-lg border-2 border-slate-600 required"
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>

            {isPaid && (
              <input
                type="number"
                placeholder="Please Enter the paid Amount"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                className="px-2 py-2 rounded-lg border-2 border-slate-600 required"
              />
            )}

            <input
              type="number"
              placeholder="Please Enter Total Amount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="px-2 py-2   rounded-lg  border-2 border-slate-600  required"
            />

            <div className="relative">
              <label
                htmlFor="imageUpload"
                className="absolute top-0 left-[-12px] bg-blue-500 text-white font-bold px-2 py-2 rounded cursor-pointer z-10"
              >
                Upload an Image
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="pl-8 relative z-0 mt-1 font-bold"
                onChange={handleChangeImage}
              />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>

        <div className="mt-4">
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="bill"
              className="w-1/3 md:w-1/2"
            />
          )}

          {loading ? (
            <div className="flex justify-center items-center mt-12">
              <div className="w-16 h-16 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            textResult && (
              <div className="mt-12">
                <textarea
                  value={textResult}
                  onChange={handleTextChange}
                  className="w-full h-60 p-2 border rounded-lg"
                ></textarea>
                <h2 className="mt-4 text-lg font-bold">Filtered Text:</h2>
                <textarea
                  value={filteredResult}
                  readOnly
                  className="w-full h-40 p-2 border rounded-lg mt-2"
                  placeholder="Filtered text will appear here..."
                ></textarea>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Bills;
