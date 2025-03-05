import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const SalesBill = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [billNo, setBillNo] = useState("");
  const [billDate, setBillDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [totalAmount, setTotalAmount] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [payMode, setPayMode] = useState("");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const [salesId, setSalesId] = useState(null);

  const [availableProducts, setAvailableProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [products, setProducts] = useState([
    {
      productId: "",
      productName: "",
      quantity: "",
      rate: "",
      discount: "1",
      discountAmount: "",
    },
  ]);

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
    } catch (error) {
      toast.error("Error fetching customers:", error.response || error.message);
      if (error.response?.status === 400) {
        toast.error("Bad Request: Check query parameters or data format.");
      }
    } finally {
      setLoading(false);
    }
  };

  //Get Products
  const fetchProducts = async (pageNumber, pageSize, searchQuery) => {
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
      setAvailableProducts(response?.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  // Handle changes for the form fields
 const handleProductChange = (index, event) => {
   const { name, value } = event.target;
   setProducts((prevProducts) => {
     const updatedProducts = [...prevProducts];
     updatedProducts[index] = {
       ...updatedProducts[index],
       [name]: value,
     };

     // Set rate and productName when product is selected
     if (name === "productId") {
       const selectedProduct = availableProducts.find(
         (product) => product.productId === value
       );
       updatedProducts[index].rate = selectedProduct
         ? selectedProduct.salesPrice
         : "";
       updatedProducts[index].productName = selectedProduct
         ? selectedProduct.productName
         : ""; // Set product name
     }

     return updatedProducts;
   });
 };



  // Add new product row to the form
  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        productId: "",
        productName: "",
        quantity: "",
        rate: "",
        discount: "1",
        discountAmount: "",
      },
    ]);
  };

  useEffect(() => {
    const total = products.reduce(
      (acc, product) => acc + Number(product.quantity || 0),
      0
    );
    setTotalQuantity(total);
  }, [products]);

  //Add Bill
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      !billNo ||
      !billDate ||
      !totalAmount ||
      !totalQuantity ||
      !selectedCustomerId ||
      !payMode ||
      !receivedAmount ||
      products.length === 0
    ) {
      toast.error("All fields are required.");
      return;
    }
    try {
      const token = localStorage.getItem("authToken");

      const billData = {
        billNo,
        billDate: billDate ? billDate : "",
        totalAmount,
        totalQuantity,
        products: products.map((product) => ({
          productId: product.productId,
          productName: product.productName,
          quantity: product.quantity,
          rate: product.rate,
          discount: product.discount,
          discountAmount: product.discountAmount,
        })),
        customerId: selectedCustomerId,
        payMode,
        receivedAmount,
      };

      const response = await axios.post(
        "https://localhost:7287/api/SaleBill",
        billData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const salesId = response?.data?.data?.salesId;
        setSalesId(salesId);
        console.log(salesId);
        toast.success("Bill added successfully.");
        setBillNo("");
        setBillDate("");
        setTotalAmount("");
        setTotalQuantity("");
        setCustomers([]);
        setPayMode("");
        setReceivedAmount("");
        setProducts([
          {
            productId: "",
            productName: "",
            quantity: "",
            rate: "",
            discount: "",
            discountAmount: "",
          },
        ]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error on calling APi!");
    } finally {
      setLoading(false);
    }
  };

  //GENERATE SALES BILL
  const generateBillPdf = async () => {
    if (!salesId) {
      toast.error("Sales Id Not Found!");
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://localhost:7287/api/GenerateSalesBillQuery/${salesId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "Sales_Bill.pdf";

      if (contentDisposition) {
        const match = contentDisposition.match(
          /filename\*?=['"]?(?:UTF-8'')?([^;'"\n]+)/
        );
        if (match && match[1]) {
          fileName = decodeURIComponent(match[1]);
        }
      }

      const url = URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Error fetching bill:", error.response || error.message);
      if (error.response?.status === 400) {
        toast.error("Bad Request: Check query parameters or data format.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen md:ml-[20%] md:w-[80%]">
        <div className="p-4">
          {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
        </div>
        <h2 className="mt-4 text-xl font-bold text-center">Sales Bill</h2>

        <div className="flex w-full">
          <div className="my-2 mr-3 w-full">
            <div className="bg-white p-6 rounded shadow-lg w-full">
              <form action="" onSubmit={handleSubmit}>
                <div className="flex gap-4 mb-6 w-full">
                  <input
                    type="date"
                    placeholder="Enter Bill Date"
                    name="billDate"
                    value={billDate ? billDate.split("T")[0] : ""}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      selectedDate.setHours(0, 0, 0, 0);
                      const isoDate = selectedDate.toISOString();
                      setBillDate(isoDate);
                    }}
                    className="border border-gray-300 rounded px-3 py-1 mb-2 w-full"
                  />

                  <input
                    type="text"
                    className="border border-gray-300 rounded px-3 py-1 mb-2 w-full"
                    placeholder="Enter the Bill No"
                    name="billNo"
                    value={billNo}
                    onChange={(e) => setBillNo(e.target.value)}
                  />

                  <select
                    className="border border-gray-300 rounded px-3 py-1 mb-2 w-full text-gray-800"
                    name="selectedCustomerId"
                    value={selectedCustomerId}
                    onChange={(e) => {
                      setSelectedCustomerId(e.target.value);
                    }}
                  >
                    <option value="">Select a customer</option>
                    {customers?.map((customer) => (
                      <option
                        key={customer.customerId}
                        value={customer.customerId}
                      >
                        {customer.customerName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Issue New Bill Button */}
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={() => {
                    setIsModelOpen(true);
                    setIsButtonDisabled(true);
                  }}
                  disabled={isButtonDisabled}
                >
                  Issue New Bill
                </button>

                {/* Product Table */}
                {isModelOpen && (
                  <div className="mt-4">
                    <div className="mb-4">
                      {/* Products Inputs */}
                      {products.map((product, index) => (
                        <div key={index} className="mb-4 flex w-full gap-6">
                          {/* Product Name */}
                          <div className="mb-4 w-full">
                            <label className="block text-sm font-semibold text-slate-900 mb-1">
                              Product
                            </label>
                            <select
                              className="border border-gray-300 rounded px-3 py-2 w-full text-gray-800 focus:ring-2 focus:ring-blue-500"
                              name="productId"
                              value={product.productId}
                              onChange={(e) => handleProductChange(index, e)}
                            >
                              <option value="" className="text-gray-400">
                                Select a product
                              </option>
                              {availableProducts.map((availableProduct) => (
                                <option
                                  key={availableProduct.productId}
                                  value={availableProduct.productId}
                                >
                                  {availableProduct.productName} -{" "}
                                  {availableProduct.salesPrice}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Sales Price (Only shown after product selection) */}
                          {product.productId && (
                            <div className="mb-4 w-full">
                              {/* Display 'Price: ' label */}
                              <label className="block text-sm font-semibold text-slate-900 mb-1">
                                Price:
                              </label>
                              <input
                                type="text"
                                value={
                                  availableProducts.find(
                                    (availableProduct) =>
                                      availableProduct.productId ===
                                      product.productId
                                  )?.salesPrice || ""
                                }
                                className="border border-gray-300 rounded px-3 py-2 w-full bg-gray-100 text-gray-600"
                                readOnly
                              />
                            </div>
                          )}

                          {/* Quantity */}
                          <div className="mb-4 w-full">
                            <label className="block text-sm font-semibold text-slate-900 mb-1">
                              Quantity
                            </label>
                            <input
                              type="number"
                              name="quantity"
                              placeholder="Enter Quantity"
                              value={product.quantity}
                              onChange={(e) => handleProductChange(index, e)}
                              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          {/* Discount Amount */}
                          <div className="mb-4 w-full">
                            <label className="block text-sm font-semibold text-slate-900 mb-1">
                              Discount Amount
                            </label>
                            <input
                              type="number"
                              placeholder="Enter Discount Amount"
                              name="discountAmount"
                              value={product.discountAmount}
                              onChange={(e) => handleProductChange(index, e)}
                              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      ))}

                      {/* Add Another Product Button */}
                      <div className="flex justify-end mt-4">
                        <button
                          type="button"
                          onClick={handleAddProduct}
                          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 focus:ring-4 focus:ring-green-500 transition"
                        >
                          Add Another Product
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                  <input
                    type="text"
                    placeholder="Total Quantity"
                    name="totalQuantity"
                    value={totalQuantity}
                    className="border border-gray-300 rounded px-3 py-1 mb-2 w-full"
                    readOnly
                  />

                  <input
                    type="text"
                    placeholder="Total Amount"
                    name="totalAmount"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 mb-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Received Amount"
                    name="receiveAmount"
                    value={receivedAmount}
                    onChange={(e) => setReceivedAmount(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 mb-2 w-full"
                  />
                  <select
                    name="payMode"
                    value={payMode}
                    onChange={(e) => setPayMode(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 mb-2 w-full"
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="0">Cash</option>
                    <option value="1">Online</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2">
                  <button className="bg-red-500 px-4 py-2 rounded text-white">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Submit Bill
                  </button>
                </div>
              </form>
              <div className="flex justify-end mt-2">
                <button
                  onClick={generateBillPdf}
                  disabled={!salesId}
                  className={`px-2 py-1 rounded ${
                    salesId
                      ? "bg-green-600 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  Download Sales Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesBill;
