import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")

const handleLogin =()=>{
  e.preventDefault();
}
  return (
    <div className='bg-gray-300 h-screen flex justify-center items-center p-6'>
    <div className='bg-white shadow-2xl px-16 py-10  rounded-xl'>
          <h2 className='text-gray-600 text-xl mb-2'>Access to Sales details!</h2>
          <form onSubmit={handleLogin} className='flex flex-col'>
          <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none required'
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none required'
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                 className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none required'
              />
              <button type="submit" className='bg-blue-600 w-full text-white font-bold px-2 py-2 mb-2 rounded-lg hover:bg-blue-800'>Sign up</button>
          </form>
        
        <Link to='/' className='text-purple-800'>Already Signup?</Link>
          
        </div>
    </div> 
  )
}

export default Signup
