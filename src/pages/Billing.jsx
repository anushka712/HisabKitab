import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Billing = () => {
  const [isModalOpen, setIsModelOpen] = useState(false);
  return (
    <>
      {/* Main div for billing */}
      <div className="p-4 md:p-8">
        <div className="flex justify-end mb-4">
          <button
            className="bg-green-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsModelOpen(true)}
          >
            Add Products
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg w-80">
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
                  placeholder="Enter Quantity"
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                />
                <br />
                <input
                  type="text"
                  placeholder="Rate"
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                />
                <br />
                <input
                  type="text"
                  placeholder="Total Price"
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

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
              <th className="py-3 px-6 text-left">S.N</th>
                <th className="py-3 px-6 text-left">Products</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Rate</th>
                <th className="py-3 px-6 text-left">Total</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">1</td>
                <td className="py-3 px-6 text-left">Pen</td>
                <td className="py-3 px-6 text-left">2</td>
                <td className="py-3 px-6 text-left">10</td>
                <td className="py-3 px-6 text-left">20</td>
                <td className="py-3 px-6 text-left">
                  <div className="flex item-center justify-start">
                    <span className="flex items-center mr-4 cursor-pointer group">
                      <FaEdit className="text-green-700" />
                      <span className="ml-1 text-green-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        Edit
                      </span>
                    </span>
                    <span className="flex items-center cursor-pointer group">
                      <MdDelete className="text-red-600" />
                      <span className="ml-1 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        Delete
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-end mt-4">
          <div className="bg-gray-100 w-fit">
            <h1 className="text-sm border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] p-2">
              Total: 20
            </h1>
          </div>
        </div>

        <div className="flex justify-end mt-2 cursor-pointer">
          <p className="font-bold bg-blue-500 text-white px-4 py-2 w-fit rounded-lg">
            Send
          </p>
        </div>
      </div>
    </>
  );
};

export default Billing;
