import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { RiStockFill } from "react-icons/ri";

const Dashboard = () => {
  const location = useLocation();

  const links = [
    { path : "/dashboard", label: "Dashboard", icon: AiFillDashboard },
    { path : "/dashboard/billing", label: "Billing", icon: FaMoneyBillTrendUp },
    { path : "/dashboard/stock", label: "Stock", icon: RiStockFill },
    { path : "/dashboard/bills", label: "Bills", icon: FaRegNewspaper },
    { path : "/logout", label: "Logout", icon: IoMdLogOut },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row px-4">
        {/* Sidebar */}
        <div className="text-white bg-black p-4 md:h-screen md:fixed md:w-[25%]">
          <h2 className="font-bold text-2xl">Sales Management</h2>
          <ul className="mt-4">
            {links.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <li
                  className={`flex mt-2 p-1 rounded-lg ${
                    location.pathname === path
                      ? "bg-slate-400 text-black font-bold" // Active styles
                      : "hover:bg-slate-400 hover:text-black" // Hover styles
                  }`}
                >
                  <Icon size={30} className="pr-2" />
                  <span>{label}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="md:ml-[30%] p-2 md:w-[75%]">
          <div className="text-center p-4 shadow-xl">
            <h2 className="font-bold text-2xl">Sales Dashboard</h2>
          </div>
          <div>
            <p className="text-center mt-2 text-blue-800">
              Here we will show the chart
            </p>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
