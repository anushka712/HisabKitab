import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Billing from './pages/Billing';
import Stock from './pages/Stock';
import Signup from './pages/Signup';
import Bills from './pages/Bills';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
      
        <Route path="/dashboard" element={<Dashboard/>}>
        <Route path="/dashboard/billing" element={<Billing/>}></Route>
        <Route path='/dashboard/stock' element={<Stock/>}></Route>
        <Route path='/dashboard/bills' element={<Bills/>}></Route>
        </Route>

        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
