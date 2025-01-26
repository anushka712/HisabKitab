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
        { categoryName }, // Send as an object
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

  useEffect(() => {
    getCategory();
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
              <div className="bg-white p-6 rounded shadow-lg ">
                <h2 className="text-lg font-bold mb-4 text-center">
                  Add a New Product
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
                      <option key={category.id} value={category.categoryId}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                  <br />
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
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="Date"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  />
                  <br />
                  <input
                    type="number"
                    value={salesPrice}
                    onChange={(e) => setSalesPrice(e.target.value)}
                    placeholder="Sales Price"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  />
                  <br />
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="Purchase  Price"
                    className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsModalOpenStock(false)}
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

      <div>
        <table className="w-full text-sm text-left ">
          <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Products</th>
              <th className="border border-gray-300 p-2 text-left">Rate</th>
              <th className="border border-gray-300 p-2 text-left">Quantity</th>
              <th className="border border-gray-300 p-2 text-left">
                Available
              </th>
              <th className="border border-gray-300 p-2 text-left">Sold</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">2</td>
              <td className="border border-gray-300 p-2">3</td>
              <td className="border border-gray-300 p-2"> 4</td>
              <td className="border border-gray-300 p-2">5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
