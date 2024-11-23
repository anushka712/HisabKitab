import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import {data} from './Data'

const Stock = () => {
  const [search, setSearch] = useState('');
  //console.log(data);
  
  return (
    <div>

<form>
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
    </form>
    
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
  {data
  .filter((item) => {
    return search === '' ? item
     : item.product.toLowerCase().includes(search.toLowerCase());
  })
  .map((item, index) => (
<tr key={index}>
    <td className='border border-gray-300 p-2'>{item.product}</td>
    <td className='border border-gray-300 p-2'>{item.rate}</td>
    <td className='border border-gray-300 p-2'>{item.quantity}</td>
    <td className='border border-gray-300 p-2'>{item.available}</td>
    <td className='border border-gray-300 p-2'>{item.sold}</td>
    </tr>
)
  )
  }
 
 </tbody>
</table>
 </div>

    </div>
  )
}

export default Stock
