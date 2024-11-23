import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { data } from "./Data";

const Stock = () => {
  const [search, setSearch] = useState("");
  //console.log(data);
  const [isModalOpen, setIsModelOpen] = useState(false);

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
            onClick={() => setIsModelOpen(true)}
          >
            Add Products
          </button>
          {isModalOpen && (
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
                    onClick={() => setIsModelOpen(false)}
                    className="bg-red-500 px-4 py-2 rounded text-white"
                  >
                    Cancel
                  </button>
                  <button
                     onClick={() => setIsModelOpen(false)}
                    className="bg-green-800 text-white px-4 py-2 rounded"
                  >
                    Add
                  </button>
                </div>
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
            {data
              .filter((item) => {
                return search === ""
                  ? item
                  : item.product.toLowerCase().includes(search.toLowerCase());
              })
              .map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{item.product}</td>
                  <td className="border border-gray-300 p-2">{item.rate}</td>
                  <td className="border border-gray-300 p-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.available}
                  </td>
                  <td className="border border-gray-300 p-2">{item.sold}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
