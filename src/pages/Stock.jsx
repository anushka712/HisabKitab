import React from 'react'
import { FaSearch } from 'react-icons/fa';

const Stock = () => {
  return (
    <div>

<div className="flex items-center border border-gray-300 rounded-md px-2 w-64 my-2">
      <input
        type="text"
        className="outline-none w-full pl-2 pr-8 py-1 text-gray-700"
        placeholder="Search..."
      />
      <button className="text-gray-500">
        <FaSearch size={20} />
      </button>
    </div>
    
<div>
<table className="w-full text-sm text-left ">
 <thead className='text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]'>
   <tr>  
    <th className='border border-gray-300 p-2 text-left'>Products</th>
    <th className='border border-gray-300 p-2 text-left'>Rate</th>
    <th className='border border-gray-300 p-2 text-left'>Total</th>
    <th className='border border-gray-300 p-2 text-left'>Available</th>
    <th className='border border-gray-300 p-2 text-left'>Sold</th>
    </tr>
    
 </thead>
<tbody>
 <tr>
    <td className='border border-gray-300 p-2'>Pen</td>
    <td className='border border-gray-300 p-2'>10</td>
    <td className='border border-gray-300 p-2'>8</td>
    <td className='border border-gray-300 p-2'>2</td>
    <td className='border border-gray-300 p-2'>6</td>
    </tr>
 </tbody>
</table>
 </div>

    </div>
  )
}

export default Stock
