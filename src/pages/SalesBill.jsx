import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const SalesBill = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [billNo, setBillNo] = useState("");
  const [billDate, setBillDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [payMode, setPayMode] = useState("");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const [availableProducts, setAvailableProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [products, setProducts] = useState([
    {
      productId: "",
      productName: "",
      quantity: "",
      rate: "",
      discount: "",
      discountAmount: "",
    },
  ]);

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

  //Get Products
  const fetchProducts = async (pageNumber, pageSize, searchQuery) => {
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
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  // Handle changes for the form fields
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index][name] = value;
    setProducts(updatedProducts);
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
        discount: "",
        discountAmount: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
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
        billDate,
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
      toast.error(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <>
      <div className="w-full h-screen md:ml-[20%] md:w-[80%]">
        <h2 className="mt-4 text-xl text-center">Sales Bill</h2>

        <div className="flex w-full">
          <div className="my-2 mr-3 w-full">
            <div className="bg-white p-6 rounded shadow-lg w-full">
              <form action="" onSubmit={handleSubmit}>
                <div className="flex gap-4 mb-6 w-full">
                  <input
                    type="date"
                    placeholder="Enter Bill Date"
                    name="billDate"
                    value={billDate}
                    onChange={(e) => setBillDate(e.target.value)}
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
                      console.log("Selected Customer ID:", e.target.value);
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
                      <div className="grid grid-cols-6">
                        {/* Static Headings for the first time */}
                        <div className="col-span-2">
                          <label className="block mb-1 font-semibold text-slate-900">
                            Product
                          </label>
                        </div>
                        <div>
                          <label className="block mb-1">Quantity</label>
                        </div>
                        <div>
                          <label className="block mb-1">
                            Rate (Sales Price)
                          </label>
                        </div>
                        <div>
                          <label className="block mb-1">Discount</label>
                        </div>
                        <div>
                          <label className="block mb-1">Discount Amount</label>
                        </div>
                      </div>

                      {/* Products Inputs */}
                      {products.map((product, index) => (
                        <div key={index} className="mb-1">
                          <div className="grid grid-cols-6 ">
                            {/* Product Name */}
                            <div className="col-span-2">
                              <select
                                className="border border-gray-300 rounded px-3 py-1 w-full text-gray-800"
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
                                    {availableProduct.SalesPrice}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Quantity */}
                            <div>
                              <input
                                type="number"
                                name="quantity"
                                placeholder="Enter Quantity"
                                value={product.quantity}
                                onChange={(e) => handleProductChange(index, e)}
                                className="border border-gray-300 rounded px-3 py-1 w-full"
                              />
                            </div>

                            {/* Rate (Sales Price) */}
                            <div>
                              <input
                                type="number"
                                name="rate"
                                placeholder="Enter Rate"
                                value={product.rate}
                                onChange={(e) => handleProductChange(index, e)}
                                className="border border-gray-300 rounded px-3 py-1 w-full"
                              />
                            </div>

                            {/* Discount */}
                            <div>
                              <input
                                type="number"
                                name="discount"
                                placeholder="Enter Discount"
                                value={product.discount}
                                onChange={(e) => handleProductChange(index, e)}
                                className="border border-gray-300 rounded px-3 py-1 w-full"
                              />
                            </div>

                            {/* Discount Amount */}
                            <div>
                              <input
                                type="number"
                                placeholder="Enter Discount Amount"
                                name="discountAmount"
                                value={product.discountAmount}
                                onChange={(e) => handleProductChange(index, e)}
                                className="border border-gray-300 rounded px-3 py-1 w-full"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleAddProduct}
                          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
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
                    placeholder="Total Amount"
                    name="totalAmount"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 mb-2 w-full"
                  />

                  <input
                    type="text"
                    placeholder="Total Quantity"
                    name="totalQuantity"
                    value={totalQuantity}
                    onChange={(e) => setTotalQuantity(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 mb-2 w-full"
                  />

                  <input
                    type="text"
                    placeholder="Pay Mode"
                    name="payMode"
                    value={payMode}
                    onChange={(e) => setPayMode(e.target.value)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesBill;
