import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Animated from "../components/Animated";
import Contact from "../components/Contact";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import AboutApp from "../components/AboutApp";
import Users from "../components/Users";
import SatisfiedUsers from "../components/SatisfiedUsers";
import Customers from "../components/Customers";

const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        <div id="home" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
          <Animated />
        </div>
        <Users />
        <div id="about">
          <AboutApp />
        </div>
        {/* <SatisfiedUsers/> */}
        {/* <div id="featured">
          <Featured />
        </div> */}
        <div id="customers">
          <Customers />
        </div>
        <div id="contact">
          <Contact />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
