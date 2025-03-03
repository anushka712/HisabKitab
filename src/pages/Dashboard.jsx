import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { RiStockFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { FaUserGroup } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    {
      path: "/dashboard/main-component",
      label: "Dashboard",
      icon: AiFillDashboard,
    },
    {
      path: "/dashboard/billing",
      label: "Sales Bill",
      icon: FaMoneyBillTrendUp,
    },

    { path: "/dashboard/bills", label: "Save Bills", icon: FaRegNewspaper },
    {
      path: "/dashboard/wholesellers",
      label: "Wholesellers",
      icon: FaUserGroup,
    },

    {
      path: "/dashboard/customers",
      label: "Customers",
      icon: FaUsers,
    },
    { path: "/dashboard/stock", label: "Stock", icon: RiStockFill },
    {
      path: "/dashboard/category",
      label: "Category",
      icon: TbCategory,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("User logout succcessfully");
    navigate("/");
  };

  return (
    <>
      <div className="bg-black h-14 flex justify-between items-center px-4  sticky top-0">
        <h2 className=" text-white font-bold text-2xl">Sales Management</h2>
        <UserMenu />
      </div>

      <div className="flex flex-col md:flex-row ">
        {/* Sidebar */}
        <div className="text-white bg-black  md:h-screen md:fixed md:w-[20%] pl-2">
          <ul className="mt-4">
            {links.map(({ path, label, icon: Icon }) =>
              label === "Logout" ? (
                <li
                  key={label}
                  onClick={handleLogout} // Logout handler
                  className="flex mt-2 p-1 rounded-lg cursor-pointer hover:bg-slate-400 hover:text-black"
                >
                  <Icon size={30} className="pr-2" />
                  <span>{label}</span>
                </li>
              ) : (
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
              )
            )}
          </ul>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
