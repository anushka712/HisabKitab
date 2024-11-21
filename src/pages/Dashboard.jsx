import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {Link, Outlet} from 'react-router-dom'
import { AiFillDashboard } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { RiStockFill } from "react-icons/ri";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";


const Dashboard = () => {
  return (
   <>
   {/* Main div */}
  <div className='flex flex-col md:flex-row px-4'>


{/* first div */}
<div className='text-white bg-black p-4 md:h-screen  md:fixed md:w-[25%]'>
<h2 className='font-bold text-2xl'>Sales Management</h2>

<ul className='mt-4'>

<Link to='/dashboard'> <li className='flex mt-2 p-1 rounded-lg hover:bg-slate-400  hover:text-black'><span className=' pr-2 pt-1'> Dashboard </span><AiFillDashboard  size={30} /></li> </Link>

<Link to='/dashboard/billing'> <li className='flex mt-2 p-1 rounded-lg hover:bg-slate-400  hover:text-black '><span className=' pr-2 pt-1'> Billing </span><FaMoneyBillTrendUp size={30} />
 </li> </Link>

 <Link to='/dashboard/stock'> <li className='flex mt-2 p-1 rounded-lg hover:bg-slate-400 hover:text-black '><span className=' pr-2 pt-1'> Stock </span><RiStockFill size={30} /></li> </Link>

 <Link> <li className='flex mt-2 p-1 rounded-lg hover:bg-slate-400 hover:text-black '
 ><span className=' pr-2 pt-1'> Logout </span><IoMdLogOut size={30} />
</li>
  </Link>

</ul>

</div>


{/* second div */}
<div className="md:ml-[30%] p-2 md:w-[75%]">
  
<div className='text-center p-4 shadow-xl  '>
  <h2 className='font-bold text-2xl'>Sales Dashboard</h2>
</div>

<div>
<p className='text-center mt-2 text-blue-800'>Here we will show the chart</p>
</div>

<div><Outlet/></div>

</div>

</div> 
   </>
  )
}

export default Dashboard
