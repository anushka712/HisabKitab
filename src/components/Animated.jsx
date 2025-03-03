import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CoverPic from './CoverPic';
import { SiWebmoney } from "react-icons/si";
import { Link } from 'react-router-dom';

const Animated = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          once: true,     // Animation only happens once when scrolling
        });
      }, []);
  return (
    <div data-aos="fade-up" className="mx-[10%] p-4 grid grid-cols-1 md:grid-cols-2 h-[650px] justify-center items-center">
              

              <div>
                <span className="text-green-500 font-bold text-5xl tracking-wide">Free Accounting </span>
                <span className='font-extrabold text-5xl'>Web App For Nepali Businesses</span>
                <br />
                <Link to='/signup'><button className='flex bg-green-500 justify-center items-center rounded-lg px-6 py-4 my-6 md:my-1 md:mt-10'><span><SiWebmoney size={30}  className='text-white'/></span><span className='text-white ml-2 text-xl'> Get Started on web</span></button></Link>
                </div>

               <div>
                <img src="/hisab.png" alt="no img"  className='rounded-lg'/>
                </div>
       
    </div>
  )
}

export default Animated
