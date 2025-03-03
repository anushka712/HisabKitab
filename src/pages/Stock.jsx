import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Loader from "../components/Loader";

const Stock = () => {
  const [search, setSearch] = useState("");
  //console.log(data);
  const [isModalOpenStock, setIsModalOpenStock] = useState(false);
  const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  //Priduct items
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [salesPrice, setSalesPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [openStock, setOpenStock] = useState();
  const [lowStock, setLowStock] = useState();
  const [fromDate, setFromDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [expiryDate, setExpiryDate] = useState("");
  const [itemLocation, setItemLocation] = useState("");

  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  //Get Category
  const getCategory = async (searchQuery) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("https://localhost:7287/api/Category", {
        params: {
          SearchQuery: searchQuery,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching category:", error.response || error.message);
      if (error.response?.status === 400) {
        toast.error("Bad Request: Check query parameters or data format.");
      }
    } finally {
      setLoading(false);
    }
  };

  //Add product
  const handleProductAdd = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      !unit ||
      !salesPrice ||
      !purchasePrice ||
      !openStock ||
      !lowStock ||
      !fromDate ||
      !itemLocation
    ) {
      toast.error("Product Detail is Required");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (isEditMode) {
        const response = await axios.put(
          `https://localhost:7287/api/Product`,
          {
            productName,
            productId,
            unit,
            salesPrice,
            categoryName: selectedCategory,
            purchasePrice,
            openStock,
            lowStock,
            fromDate,
            itemLocation,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response?.data?.message);
        setLoading(false);
        setIsModalOpenStock(false);
      } else {
        const response = await axios.post(
          "https://localhost:7287/api/Product",
          {
            productName,
            categoryId: selectedCategory,
            unit,
            salesPrice,
            purchasePrice,
            openStock,
            lowStock,
            fromDate,
            expiryDate,
            itemLocation,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        toast.success(response?.data?.message);
        setIsModalOpenStock(false);
        setProductName("");
        setSelectedCategory("");
        setUnit("");
        setSalesPrice("");
        setPurchasePrice("");
        setOpenStock("");
        setLowStock("");
        setFromDate("");
        setExpiryDate("");
        setItemLocation("");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  //Get Product
  const getProduct = async (pageNumber, pageSize, searchQuery) => {
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
      setProducts(response?.data?.data);
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

  //DELETE Product
  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `https://localhost:7287/api/Product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response?.data?.message);
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
      setLoading(false);
    } catch (error) {
      toast.error("Error deleting Product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId) => {
    const product = products.find((c) => c.productId === productId);
    setIsModalOpenStock(true);
    setIsEditMode(true);
    setProductName(product.productName);
    setUnit(product.unit);
    setSalesPrice(product.salesPrice);
    setPurchasePrice(product.purchasePrice);
    setOpenStock(product.openStock);
    setLowStock(product.lowStock);
    setFromDate(product.fromDate);
    setItemLocation(product.itemLocation);
    setSelectedCategory(product.categoryName);
    setProductId(product.productId);
  };

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);

  return (
    <div className="md:ml-[20%] md:w-[80%] px-8 mt-4">
      <div className="p-4">
        {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
      </div>
      <h2 className="text-xl text-slate-800 text-center mb-2">Stock</h2>
      <div className="flex justify-between ">
        <div className="flex items-center border border-gray-300 rounded-md px-2 w-64 my-2">
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

        <div className="mt-3 mr-3">
          <button
            className="bg-green-600 text-white px-2 py-1 rounded-lg"
            onClick={() => setIsModalOpenStock(true)}
          >
            Add Products
          </button>

          {/* //For Products */}
          {isModalOpenStock && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white py-6 px-12 rounded shadow-lg  w-96">
                <h2 className="text-xl font-bold text-center mb-4">
                  {isEditMode ? "Edit Product" : "Add New Product"}
                </h2>
                <form action="" onSubmit={handleProductAdd}>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                    placeholder="Enter the product name"
                  />
                  <br />

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={
                          isEditMode
                            ? category.categoryName
                            : category.categoryId
                        }
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="Total Quantity"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  />
                  <br />
                  <input
                    type="number"
                    value={openStock}
                    onChange={(e) => setOpenStock(e.target.value)}
                    placeholder="Open stock"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  />
                  <br />
                  <input
                    type="number"
                    value={lowStock}
                    onChange={(e) => setLowStock(e.target.value)}
                    placeholder="Low stock"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  />
                  <br />
                  <input
                    type="string"
                    value={itemLocation}
                    onChange={(e) => setItemLocation(e.target.value)}
                    placeholder="Item Location"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  />
                  <br />
                  {!isEditMode && (
                    <>
                      {" "}
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        placeholder="Date"
                        className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                      />
                      <br />
                    </>
                  )}

                  {!isEditMode && (
                    <>
                      <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="Date"
                        className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                      />
                      <br />
                    </>
                  )}

                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="Purchase  Price"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  />
                  <input
                    type="number"
                    value={salesPrice}
                    onChange={(e) => setSalesPrice(e.target.value)}
                    placeholder="Sales Price"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  />

                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => setIsModalOpenStock(false)}
                      className="bg-red-500 px-4 py-2 rounded text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      {isEditMode ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* GET Products */}
      <div>
        <table className="w-full text-sm text-left">
          <thead className="text-xs border border-gray-600 uppercase">
            <tr>
              <th className="border border-gray-300 p-2 text-left">FromDate</th>
              <th className="border border-gray-300 p-2 py-4 text-left">
                Category Name
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Product Name
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Item Location
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Low Stock
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Open Stock
              </th>

              <th className="border border-gray-300 p-2 text-left">
                Purchase Price
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Sales Price
              </th>
              <th className="border border-gray-300 p-2 text-left">Unit</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products?.map((product) => (
                <tr key={product.id} className="odd:bg-white even:bg-gray-100">
                  <td className="border border-gray-300 p-2">
                    {new Date(product.fromDate).toISOString().split("T")[0]}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.categoryName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.productName}
                  </td>

                  <td className="border border-gray-300 p-2">
                    {product.itemLocation}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.lowStock}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.openStock}
                  </td>

                  <td className="border border-gray-300 p-2">
                    {product.purchasePrice}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.salesPrice}
                  </td>
                  <td className="border border-gray-300 p-2">{product.unit}</td>
                  <td className="border border-gray-300 p-2">
                    <p className="flex gap-2">
                      <MdDelete
                        size={20}
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteProduct(product.productId);
                        }}
                      />
                      <FaEdit
                        size={20}
                        className="text-green-700 cursor-pointer"
                        onClick={() => {
                          handleEdit(product.productId);
                        }}
                      />
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  No Products found.
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

export default Stock;
