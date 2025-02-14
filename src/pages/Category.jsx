import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Box, Button, Typography } from "@mui/material";

const Category = () => {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryName, setCategoryName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

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
      setCategories(response?.data?.data);
    } catch (error) {
      toast.error("Error fetching category:", error.response || error.message);
      if (error.response?.status === 400) {
        toast.error("Bad Request: Check query parameters or data format.");
      }
    } finally {
      setLoading(false);
    }
  };

  //DELETE Customer
  const deleteCategory = async (categoryId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `https://localhost:7287/api/Category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response?.data?.message);
      setCategories(
        categories.filter((category) => category.categoryId !== categoryId)
      );
      setLoading(false);
    } catch (error) {
      toast.error("Error deleting customer:", error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="mt-4 md:ml-[20%] md:w-[80%] px-10">
      <div className="p-4">
        {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
      </div>
      <h2 className="mt-8 text-2xl text-center font-bold">Category</h2>

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
        <button
          className="bg-green-600 text-white px-2 py-1 rounded-lg ml-4"
          onClick={() => setIsModalOpenCategory(true)}
        >
          Add Category
        </button>
      </div>

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
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Show Category */}
      <div>
        <table className="w-full text-sm text-left">
          <thead className="text-xs border border-gray-600 uppercase">
            <tr>
              <th className="border border-gray-300 p-2 py-4 text-left">
                Category Name
              </th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.length > 0 ? (
              categories?.map((category) => (
                <tr key={category.id}>
                  <td className="border border-gray-300 p-2">
                    {category.categoryName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <p className="flex gap-2">
                      <MdDelete
                        size={20}
                        className="text-red-600"
                        onClick={() => {
                          deleteCategory(category.categoryId);
                        }}
                      />
                      <FaEdit size={20} className="text-green-700" />
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

export default Category;
