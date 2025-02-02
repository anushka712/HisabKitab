import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SalesBill from "./pages/SalesBill";
import Stock from "./pages/Stock";
import Signup from "./pages/Signup";
import Bills from "./pages/Bills";
import Chart from "./pages/Chart";
import Home from "./pages/Home";
import Contact from "./components/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wholesellers from "./pages/Wholesellers";
import Customers from "./pages/Customers";
import UserProfile from "./pages/UserProfile";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="/dashboard/main-component" />} />
          <Route
            path="/dashboard/main-component"
            element={<MainComponent />}
          ></Route>
          <Route path="/dashboard/billing" element={<SalesBill />}></Route>
          <Route path="/dashboard/stock" element={<Stock />}></Route>
          <Route path="/dashboard/customers" element={<Customers />}></Route>
          <Route path="/dashboard/bills" element={<Bills />}></Route>
          <Route path="/dashboard/user" element={<UserProfile />}></Route>
          <Route
            path="/dashboard/wholesellers"
            element={<Wholesellers />}
          ></Route>
        </Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
