import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hamberger from './Hamberger';
import Cross from './Cross'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () =>{
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div className="bg-gray-100 shadow-md ">
      <div className="px-6 py-4 flex items-center justify-between mx-[10%]">
        {/* Logo */}
        <h1 className="text-green-600 font-extrabold text-3xl tracking-wide">
          HisabKitab
        </h1>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-gray-700 text-lg font-medium">
          <Link to="/" className="hover:text-green-600 transition duration-300">
            Home
          </Link>
          <Link
            to="/"
            className="hover:text-green-600 transition duration-300"
          >
            Blog
          </Link>
          <Link
            to="/"
            className="hover:text-green-600 transition duration-300"
          >
            Features
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="block md:hidden text-gray-700 hover:text-green-600 focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? (<Cross/>) : ( <Hamberger/>)}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 text-gray-700 text-lg font-medium p-4">
          <Link
            to="/"
            className="block py-2 hover:text-green-600 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/"
            className="block py-2 hover:text-green-600 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/"
            className="block py-2 hover:text-green-600 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
        </div>
      )}

    </div>
  );
};

export default Navbar;
