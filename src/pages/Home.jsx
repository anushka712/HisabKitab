import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Animated from '../components/Animated'
import Contact from '../components/Contact'
import Featured from '../components/Featured'
import Footer from '../components/Footer'
import AboutApp from '../components/AboutApp'
import Users from '../components/Users'
import SatisfiedUsers from '../components/SatisfiedUsers'


const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
          <Animated />
        </div>
        <Users/>
        <AboutApp />
        {/* <SatisfiedUsers/> */}
        <div id="featured">
          <Featured />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home
