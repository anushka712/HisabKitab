import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Billing from './pages/Billing';
import Stock from './pages/Stock';
import Signup from './pages/Signup';
import Bills from './pages/Bills';
import Chart from './pages/Chart';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wholesellers from './pages/Wholesellers';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}>
        <Route index element={<Navigate to="/dashboard/chart" />} />
        <Route path="/dashboard/chart" element={<Chart/>}></Route>
        <Route path="/dashboard/billing" element={<Billing/>}></Route>
        <Route path='/dashboard/stock' element={<Stock/>}></Route>
        <Route path='/dashboard/bills' element={<Bills/>}></Route>
        <Route path='/dashboard/wholesellers' element={<Wholesellers/>}></Route>
        </Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
      <ToastContainer/>
    </Router>
  )
}

export default App
