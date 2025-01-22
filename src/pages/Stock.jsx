import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { data } from "./Data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Stock = () => {
  const [search, setSearch] = useState("");
  //console.log(data);
  const [isModalOpenStock, setIsModalOpenStock] = useState(false);
  const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);

  const [categoryName, setCategoryName] = useState("");

  const navigate = useNavigate();

  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      toast.error("Category Name is Required");
      return;
    }
    try {
      const response = await axios.post("https://localhost:7287/api/Category", {
        categoryName,
      });

      console.log(response.data);

      if (response.status === 200) {
        toast.success("Category added successfully.");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.message &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occured!");
      }
    }
  };

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
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  placeholder="Enter the product name"
                />
                <br />
                <input
                  type="text"
                  placeholder="Rate of a product"
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                />
                <br />
                <input
                  type="text"
                  placeholder="Total Quantity"
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                />
                <br />
                <input
                  type="text"
                  placeholder="Available Product"
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                />
                <br />
                <input
                  type="text"
                  placeholder="Sold Product"
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
                    onClick={() => setIsModalOpenStock(false)}
                    className="bg-green-800 text-white px-4 py-2 rounded"
                  >
                    Add
                  </button>
                </div>
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
