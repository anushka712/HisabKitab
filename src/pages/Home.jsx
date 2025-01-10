import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Animated from '../components/Animated'
import Contact from '../components/Contact'


const Home = () => {
  return (
    <>
    <div>
       <Navbar/>
       <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
       <Animated />
       </div>
     <div id="contact">
     <Contact/>
     </div>
    </div>
    </>
  )
}

export default Home
