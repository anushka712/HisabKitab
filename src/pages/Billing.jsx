import React, { useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


const Billing = () => {
  const [isModalOpen, setIsModelOpen] = useState(false);
  return (
    <>
    {/* main div for billing */}
    <div>

      <h2 className='mt-4 text-xl text-center'>Bills for customer</h2>

      <div className="flex justify-end">
      
        <div className="my-2 mr-3">
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
      </div>

      <table>
      </table>
    </div>

<div>
<table className="w-full text-sm text-left ">
 <thead className='text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]'>
   <tr>  
    <th className='border border-gray-300 p-2 text-left'>Products</th>
    <th className='border border-gray-300 p-2 text-left'>Quantity</th>
    <th className='border border-gray-300 p-2 text-left'>Rate</th>
    <th className='border border-gray-300 p-2 text-left'>Total</th>
    <th className='border border-gray-300 p-2 text-left'>Actions</th>
    </tr>
    
 </thead>
<tbody>
 <tr>
    <td className='border border-gray-300 p-2'>Pen</td>
    <td className='border border-gray-300 p-2'>2</td>
    <td className='border border-gray-300 p-2'>10</td>
    <td className='border border-gray-300 p-2'>
20</td>
<td className='border border-gray-300 p-2'><span className="flex cursor-pointer justify-around">
    <span className="flex items-center pr-2 group">
      <FaEdit  className="mt-1 text-green-700" />
      <span className="ml-1 text-green-700 opacity-0 group-hover:opacity-100 transition-opacity">Edit</span>
    </span>
    <span className="flex items-center group">
      <MdDelete className="mt-1 text-red-600" />
      <span className="ml-1 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">Delete</span>
    </span>
  </span></td>
    </tr>
 </tbody>
</table>
 </div>

 <div className=' flex justify-end items-end '>
 <div className='bg-gray-100 w-fit'>
  <h1 className='text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] p-2'>Total: 20</h1>
</div>
</div>

<div  className=' flex justify-end mt-2 cursor-pointer'>
<p className='font-bold bg-blue-500 text-white px-2 py-1 w-fit rounded-lg'>Send</p>
</div>
 </>
  )
}

export default Billing
