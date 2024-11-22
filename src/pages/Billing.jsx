import React from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Billing = () => {
  return (
    <>
    {/* main div for billing */}
    <div>

      <h2 className='mt-4 text-xl text-center'>Bills for customer</h2>

      <div className='flex justify-end mr-2 cursor-pointer'>
      <p className='text-right mr-2'> Add products </p>
      <p className='mt-1 text-green-800'><IoIosAddCircle/></p>
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
<p className='font-bold bg-blue-500 text-white px-2 py-1 w-fit rounded-lg'>Print</p>
</div>
 </>
  )
}

export default Billing
