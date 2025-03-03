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
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  //Add Category
  const handleCategoryAdd = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!categoryName) {
      toast.error("Category Name is Required");
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      if (isEditMode) {
        const response = await axios.put(
          `https://localhost:7287/api/Category`,
          { categoryName, categoryId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        toast.success(response?.data?.message);
        setIsModalOpenCategory(false);
      } else {
        const response = await axios.post(
          "https://localhost:7287/api/Category",
          { categoryName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLoading(false);
        toast.success(response?.data?.message);
        setIsModalOpenCategory(false);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred!");
    } finally {
      setLoading(false);
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

  //DELETE Category
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
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (categoryId) => {
    setIsEditMode(true);
    setIsModalOpenCategory(true);
    const category = categories.find((c) => c.categoryId === categoryId);
    setCategoryName(category.categoryName);
    setCategoryId(category.categoryId);
  };

  useEffect(() => {
    getCategory();
  }, [categoryId]);

  return (
    <div className="mt-4 md:ml-[20%] md:w-[80%] px-10">
      <div className="p-4">
        {loading ? <Loader /> : <p className="text-lg font-semibold"></p>}
      </div>
      <h2 className="text-xl text-slate-800 text-center mb-2">Category</h2>

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
          className="bg-green-600 text-white px-2 py-1 rounded-lg mb-3"
          onClick={() => setIsModalOpenCategory(true)}
        >
          Add Category
        </button>
      </div>

      {/* //For Category */}
      {isModalOpenCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg ">
            <h2 className="text-xl font-bold text-center mb-4">
              {isEditMode ? "Edit Catgory" : "Add New Category"}
            </h2>
            <form onSubmit={handleCategoryAdd}>
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
                  {isEditMode ? "Update" : "Add"}
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
                <tr key={category.id} className="odd:bg-white even:bg-gray-100">
                  <td className="border border-gray-300 p-2">
                    {category.categoryName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <p className="flex gap-2">
                      <MdDelete
                        size={20}
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteCategory(category.categoryId);
                        }}
                      />
                      <FaEdit
                        onClick={() => {
                          handleEdit(category.categoryId);
                        }}
                        size={20}
                        className="text-green-700 cursor-pointer"
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

export default Category;
