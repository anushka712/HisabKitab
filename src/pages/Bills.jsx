// import React, { useCallback, useEffect, useState } from 'react';
// import { createWorker } from 'tesseract.js';
// import image from '../assets/bill.png';

// const Bills = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [textResult, setTextResult] = useState("");
//   const [filteredResult, setFilteredResult] = useState("");
//   const [loading, setLoading] = useState(false);

//   const worker = createWorker(); // worker for tesseract process

//   // Converts the uploaded image to text
//   const convertImageToText = useCallback(async () => {
//     if (!selectedImage) return;
//     setLoading(true);
//     await worker.load();
//     await worker.loadLanguage("eng");
//     await worker.initialize("eng");

//     const { data } = await worker.recognize(selectedImage);

//     setTextResult(data.text); // Set the full OCR text
//     filterText(data.text); // Filter the text immediately
//     setLoading(false);
//   }, [selectedImage]);

//   // when new image is selected it call the convertImageToText function
//   useEffect(() => {
//     convertImageToText();
//   }, [selectedImage, convertImageToText]);

//   //updates the selected image when a new image is uploaded.
//   const handleChangeImage = (e) => {
//     if (e.target.files[0]) {
//       setSelectedImage(e.target.files[0]);
//     } else {
//       setSelectedImage(null);
//       setTextResult("");
//       setFilteredResult("");
//     }
//   };

//   const handleTextChange = (e) => {
//     const updatedText = e.target.value;
//     setTextResult(updatedText); // Update the full text
//     filterText(updatedText); // Filter the updated text
//   };

//   const filterText = (text) => {
//     const keyword = "Split the text";
//     const lines = text.split('\n'); // Split text into lines
//     const matchedLines = lines.filter((line) =>
//       line.toLowerCase().includes(keyword.toLowerCase())
//     );
  
//     if (matchedLines.length > 0) {
//       setFilteredResult(matchedLines.join('\n')); // Join matched lines into a single string
//     } else {
//       setFilteredResult("Cannot detect"); // Set default message if no matches are found
//     }
//   };

//   return (
//     <>
//       <div className="mt-4">
//         <div className="relative">
//           <label
//             htmlFor="imageUpload"
//             className="absolute top-0 left-[-12px] bg-blue-500 text-white font-bold px-2 py-2 rounded cursor-pointer z-10">
//             Upload an Image
//           </label>
//           <input
//             type="file"
//             id="imageUpload"
//             accept="image/*"
//             className="pl-8 relative z-0 mt-1 font-bold"
//             onChange={handleChangeImage}
//           />
//         </div>

//         <div className="mt-4">
//           {selectedImage && (
//             <div>
//               <img src={URL.createObjectURL(selectedImage)} alt="bill" className="w-full md:w-1/2" />
//             </div>
//           )}

//           {loading ? (
//             <div className="flex justify-center items-center mt-12">
//               <div className="w-16 h-16 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
//             </div>
//           ) : (
//             textResult && (
//               <div className="mt-12">
//                 <textarea
//                   value={textResult}
//                   onChange={handleTextChange}
//                   className="w-full h-60 p-2 border rounded-lg"
//                 ></textarea>
//                 <h2 className="mt-4 text-lg font-bold">Filtered Text:</h2>
//                 <textarea
//                   value={filteredResult}
//                   readOnly
//                   className="w-full h-40 p-2 border rounded-lg mt-2"
//                   placeholder="Filtered text will appear here..."
//                 ></textarea>
//               </div>
//             )
//           )}
//         </div>

//         <img src={image} alt="Description of image" className="mt-4" />
//       </div>
//     </>
//   );
// };

// export default Bills;
import React, { useCallback, useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import image from '../assets/bill.png';

const Bills = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [filteredResult, setFilteredResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [billDate, setBillDate] = useState("");
  const [panNo, setPanNo] = useState("");
  const [billNo, setBillNo] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const worker = createWorker();

  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return;
    setLoading(true);
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const { data } = await worker.recognize(selectedImage);

    setTextResult(data.text);
    filterText(data.text);
    extractFields(data.text); // Extract fields from the text
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
    setTextResult(updatedText);
    filterText(updatedText);
    extractFields(updatedText); // Extract fields from the updated text
  };

  const filterText = (text) => {
    const keyword = "Split the text";
    const lines = text.split('\n');
    const matchedLines = lines.filter((line) =>
      line.toLowerCase().includes(keyword.toLowerCase())
    );

    if (matchedLines.length > 0) {
      setFilteredResult(matchedLines.join('\n'));
    } else {
      setFilteredResult("Cannot detect");
    }
  };

  // const extractFields = (text) => {
  //   // Define regex patterns for each field
  //   const billDatePattern = /Bill Date: (\d{2}-\d{2}-\d{4})/i;
  //   const panNoPattern = /PAN No: (\w+)/i;
  //   const billNoPattern = /Bill No: (\w+)/i;
  //   const totalAmountPattern = /Total Amount: (\d+\.\d{2})/i;

  //   const billDateMatch = text.match(billDatePattern);
  //   const panNoMatch = text.match(panNoPattern);
  //   const billNoMatch = text.match(billNoPattern);
  //   const totalAmountMatch = text.match(totalAmountPattern);

  //   setBillDate(billDateMatch ? billDateMatch[1] : "");
  //   setPanNo(panNoMatch ? panNoMatch[1] : "");
  //   setBillNo(billNoMatch ? billNoMatch[1] : "");
  //   setTotalAmount(totalAmountMatch ? totalAmountMatch[1] : "");
  // };
  const extractFields = (text) => {
    console.log("Extracting fields from text:", text);
  
    const billDatePattern = /Bill Date[:\s]+(\d{2}[-/]\d{2}[-/]\d{4})/i;
    const panNoPattern = /PAN No[:\s]+(\w+)/i;
    const billNoPattern =/BillNo:\s*[A-Za-z]+\/\d+/;
    const totalAmountPattern = /Net Total[:\s]+(\d{1,3}(,\d{3})*(\.\d{2})?)/i;

  
    const billDateMatch = text.match(billDatePattern);
    const panNoMatch = text.match(panNoPattern);
    const billNoMatch = text.match(billNoPattern);
    const totalAmountMatch = text.match(totalAmountPattern);
  
    console.log("Bill Date Match:", billDateMatch);
    console.log("PAN No Match:", panNoMatch);
    console.log("Bill No Match:", billNoMatch);
    console.log("Total Amount Match:", totalAmountMatch);
  
    setBillDate(billDateMatch ? billDateMatch[1] : "Not Found");
    setPanNo(panNoMatch ? panNoMatch[1] : "Not Found");
    setBillNo(billNoMatch ? billNoMatch[1] : "Not Found");
    setTotalAmount(totalAmountMatch ? totalAmountMatch[1] : "Not Found");
  };
  

  return (
    <>
      <div className="mt-4">
        <div className="relative">
          <label
            htmlFor="imageUpload"
            className="absolute top-0 left-[-12px] bg-blue-500 text-white font-bold px-2 py-2 rounded cursor-pointer z-10">
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

        <div className="mt-4">
          {selectedImage && (
            <div>
              <img src={URL.createObjectURL(selectedImage)} alt="bill" className="w-full md:w-1/2" />
            </div>
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

        <div className="mt-4">
          <label className="block text-lg font-bold">Bill Date:</label>
          <input
            type="text"
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          <label className="block text-lg font-bold mt-2">PAN No:</label>
          <input
            type="text"
            value={panNo}
            onChange={(e) => setPanNo(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          <label className="block text-lg font-bold mt-2">Bill No:</label>
          <input
            type="text"
            value={billNo}
            onChange={(e) => setBillNo(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          <label className="block text-lg font-bold mt-2">Total Amount:</label>
          <input
            type="text"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          
          <label className="block text-lg font-bold mt-2">Paid Amount:</label>
          <input
            type="text"
           
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <img src={image} alt="Description of image" className="mt-4" />
      </div>
    </>
  );
};

export default Bills;
