import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Stock = () => {
  const [search, setSearch] = useState("");
  //console.log(data);
  const [isModalOpenStock, setIsModalOpenStock] = useState(false);
  const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
  const [categories, setCategories] = useState("");

  const [categoryName, setCategoryName] = useState([]);

  const navigate = useNavigate();

  //Priduct items
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [salesPrice, setSalesPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [openStock, setOpenStock] = useState();
  const [lowStock, setLowStock] = useState();
  const [formDate, setFormDate] = useState("");
  const [itemLocation, setItemLocation] = useState("");

  //Add Category
  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      toast.error("Category Name is Required");
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://localhost:7287/api/Category",
        { categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Category added successfully.");
        setIsModalOpenCategory(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred!");
    }
  };

  //Get Product
  const getCategory = async (searchQuery) => {
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
    } catch (error) {
      toast.error("Error fetching category:", error.response || error.message);
      if (error.response?.status === 400) {
        toast.error("Bad Request: Check query parameters or data format.");
      }
    }
  };

  //Add product
  const handleProductAdd = async (e) => {
    e.preventDefault();
    if (
      !productName ||
      !selectedCategory ||
      !unit ||
      !salesPrice ||
      !purchasePrice ||
      !openStock ||
      !lowStock ||
      !formDate ||
      !itemLocation
    ) {
      toast.error("Product Detail is Required");
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
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
          formDate,
          itemLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product added successfully.");
        setIsModalOpenStock(false);
        setProductName("");
        setSelectedCategory("");
        setUnit("");
        setSalesPrice("");
        setPurchasePrice("");
        setOpenStock("");
        setLowStock("");
        setFormDate("");
        setItemLocation("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred!");
    }
  };

  //Get Product
  const getProduct = async (pageNumber, pageSize, searchQuery) => {
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
      // console.log("Response Data:", response?.data?.data[0]?.customerName);
      setProducts(response?.data?.data);
    } catch (error) {
      toast.error("Error fetching customers:", error.response || error.message);
      if (error.response?.status === 400) {
        toast.error("Bad Request: Check query parameters or data format.");
      }
    }
  };

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
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
            className="bg-green-700 text-white px-2 py-1 rounded-lg"
            onClick={() => setIsModalOpenStock(true)}
          >
            Add Products
          </button>
          <button
            className="bg-green-700 text-white px-2 py-1 rounded-lg ml-4"
            onClick={() => setIsModalOpenCategory(true)}
          >
            Add Category
          </button>

          {/* //For Products */}
          {isModalOpenStock && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl mx-4">
      <h2 className="text-xl font-bold mb-6 text-center">Add a New Product</h2>
      <form action="" onSubmit={handleProductAdd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
              placeholder="Enter the product name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Total Quantity</label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Open Stock</label>
            <input
              type="number"
              value={openStock}
              onChange={(e) => setOpenStock(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
              placeholder="Enter open stock"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Low Stock</label>
            <input
              type="number"
              value={lowStock}
              onChange={(e) => setLowStock(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
              placeholder="Enter low stock"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Item Location</label>
            <input
              type="text"
              value={itemLocation}
              onChange={(e) => setItemLocation(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
              placeholder="Enter item location"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={formDate}
              onChange={(e) => setFormDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Sales Price</label>
            <input
              type="number"
              value={salesPrice}
              onChange={(e) => setSalesPrice(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
              placeholder="Enter sales price"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Purchase Price</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
              placeholder="Enter purchase price"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsModalOpenStock(false)}
            className="bg-red-500 px-6 py-2 rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-800 text-white px-6 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
)}


          {/* //For Category */}
          {isModalOpenCategory && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg ">
                <h2 className="text-lg font-bold mb-4 text-center">
                  Add a New Category
                </h2>
                <form action="" onSubmit={handleCategoryAdd}>
                  <input
                    type="text"
                    name="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                    placeholder="Enter the Category Name"
                  />
                  <br />

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsModalOpenCategory(false)}
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
          )}
        </div>
      </div>

      {/* GET Products */}
      <div>
        <table className="w-full text-sm text-left ">
          <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
            <tr>
              <th className="border border-gray-300 p-2 text-left">
                Categoty Name
              </th>
              <th className="border border-gray-300 p-2 text-left">fromDate</th>
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
                Product Name
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Purchase Price
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Sales Price
              </th>
              <th className="border border-gray-300 p-2 text-left">Unit</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((products) => {
              return (
                <tr key={products.id}>
                  <td className="border border-gray-300 p-2">
                    {products.categoryName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(products.fromDate).toISOString().split("T")[0]}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {products.itemLocation}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {products.lowStock}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {products.openStock}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {products.productName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {products.purchasePrice}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {products.salesPrice}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {products.unit}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
