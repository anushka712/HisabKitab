import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {Link, Outlet} from 'react-router-dom'
import { AiFillDashboard } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";


const Dashboard = () => {
  return (
   <>
   {/* Main div */}
  <div className='flex flex-col md:flex-row'>


{/* first div */}
<div className='text-white bg-black p-4 h-screen  md:fixed md:w-[25%]'>
<h2 className='font-bold text-2xl'>Sales Management</h2>

<ul className='mt-4'>

<Link to='/dashboard'> <li className='flex mt-2 p-1 rounded-lg hover:bg-slate-400  hover:text-black'><span className=' pr-2 pt-1'> Dashboard </span><AiFillDashboard  size={30} /></li> </Link>

<Link to='/dashboard/billing'> <li className='flex mt-2 p-1 rounded-lg hover:bg-slate-400  hover:text-black '><span className=' pr-2 pt-1'> Billing </span><RiAdminFill size={30} />
 </li> </Link>

 <Link to='/dashboard/stock'> <li className='flex mt-2 p-1 rounded-lg hover:bg-slate-400 hover:text-black '><span className=' pr-2 pt-1'> Stock </span><FaUserDoctor size={30} /></li> </Link>

 <Link> <li className='flex mt-2 p-1 rounded-lg hover:bg-slate-400 hover:text-black '
 ><span className=' pr-2 pt-1'> Logout </span><IoMdLogOut size={30} />
</li>
  </Link>

</ul>

</div>


{/* second div */}
<div className="md:ml-[35%] p-2 md:w-[75%]">
  
<div className='text-center p-4 shadow-xl font-bold text-2xl '>
  <h2 >Sales Dashboard</h2>
</div>

<div><Outlet/></div>

</div>

</div> 
   </>
  )
}

export default Dashboard
