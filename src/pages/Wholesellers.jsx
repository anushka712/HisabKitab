import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';


const Wholesellers = () => {
  const [isModalOpen, setIsModelOpen] = useState(false);

  const [wholeSellers, setWholeSellers] = useState([]);


  const [panNo, setPanNo] = useState("")
  const [sellerName, setSellerName ] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNo, setPhoneNo] = useState("")

  const handlewholesellers = async() =>{
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get("https://localhost:7287/api/Wholesaler",{
            headers: {
                Authorization: `Bearer ${token}`,
              }, 
        }
        );
        if(response.data.statusCode === 200){
            setWholeSellers(response.data.data)
        }else{
            toast.error("Failed to fetch data", response.data.message); 
        } 
    } catch (error) {
     toast.error("Error fetching", error);
        
    }
    }

    const addWholeSellers = async (e) =>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
          const response =  await axios.post("https://localhost:7287/api/Wholesaler",{
                panNo,
                sellerName,
                address,
                phoneNo
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                  }, 
            },)
            if(response.data.statusCode === 200){
                toast.success(response.data.message)
                setIsModelOpen(false);
                setPanNo('');
                setSellerName('');
                setAddress('');
                setPhoneNo('');
                handlewholesellers();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || "An unexpected error occurred";
            toast.error(errorMessage); 
        }
    }


    useEffect(() =>{
        handlewholesellers();
    },[])

  return (
    <>
    {/* main div for wholesellers */}
    <div>

      <h2 className='mt-8 text-2xl text-center font-bold'>Wholesellers</h2>

      <div className="flex justify-end">
      
        <div className="my-2 mr-3">
          <button
            className="bg-green-700 text-white px-2 py-1 rounded-lg"
            onClick={() => setIsModelOpen(true)}
          >
            Add Wholesellers
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-12 rounded shadow-lg ">
                <h2 className="text-lg font-bold mb-4 text-center">
                  Add a New Wholesellers
                </h2>

                {/* form start */}
                <div>
                    <form onSubmit={addWholeSellers}>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  placeholder="Enter the Pan No:"
                  value={panNo}
                  onChange={(e) => setPanNo(e.target.value)}
                />
                  <br />
                <input
                  type="text"
                  placeholder="Enter seller name"
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Address"
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <br />
                <input
                  type="text"
                 placeholder="Phone No:"
                  className="border border-gray-300 rounded px-3 py-1 w-full mb-2"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsModelOpen(false)}
                    className="bg-red-500 px-4 py-2 rounded text-white"
                  >
                    Cancel
                  </button>
                 <button type="submit" 
                    className="bg-green-800 text-white px-4 py-2 rounded">Add</button>
                </div>


                </form>
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
    <th className='border border-gray-300 p-2 text-left'>Pan No:</th>
    <th className='border border-gray-300 p-2 text-left'>Seller Name</th>
    <th className='border border-gray-300 p-2 text-left'>Address</th>
    <th className='border border-gray-300 p-2 text-left'>Phone No:</th>
    <th className='border border-gray-300 p-2 text-left'>Actions</th>
    </tr>
    
 </thead>
 <tbody>
  {wholeSellers.map((wholeSeller, index) => (
    <tr key={index}>
      <td className="border border-gray-300 p-2">{wholeSeller.panNo}</td>
      <td className="border border-gray-300 p-2">{wholeSeller.sellerName}</td>
      <td className="border border-gray-300 p-2">{wholeSeller.address}</td>
      <td className="border border-gray-300 p-2">{wholeSeller.phoneNo}</td>
      <td className="border border-gray-300 p-2">
        <span className="flex cursor-pointer justify-around">
          {/* Edit Button */}
          <span className="flex items-center pr-2 group">
            <FaEdit className="mt-1 text-green-700" />
            <span className="ml-1 text-green-700 opacity-0 group-hover:opacity-100 transition-opacity">
              Edit
            </span>
          </span>
          {/* Delete Button */}
          <span className="flex items-center group">
            <MdDelete className="mt-1 text-red-600" />
            <span className="ml-1 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
              Delete
            </span>
          </span>
        </span>
      </td>
    </tr>
  ))}
</tbody>

</table>
 </div>
 </>
  )
}

export default Wholesellers

