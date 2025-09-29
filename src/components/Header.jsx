import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="top-0 bg-blue-100 font-serif p-1 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-2 justify-center items-center w-full">
          <Link
            to="/"
            className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to=""
            className=" px-4 py-2 rounded-md text-base font-medium"
          >
            |
          </Link>
          <Link
            to="/packages"
            className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium"
          >
            Packages Deals
          </Link>
          <Link
            to="/packages"
            className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium"
          >
            Facial
          </Link>
          <Link
            to="/packages"
            className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium"
          >
            Waxing
          </Link>
          <Link
            to="/packages"
            className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium"
          >
            Meni & Pedi
          </Link>
          <Link
            to="/packages"
            className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium"
          >
            Hair Care
          </Link>
          <Link
            to="/packages"
            className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium"
          >
            Make UP
          </Link>
          <Link
            to="/packages"
            className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium"
          >
            Nail Art
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden w-full flex justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-full max-w-xs px-3 py-3 border rounded text-gray-700 border-gray-700"
          >
            {isOpen ? <X /> : <Menu />}
            <span className="ml-2">Deals</span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-blue-100 bg-opacity-50 backdrop-blur-sm flex flex-col items-center pt-16 space-y-3 z-40">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="self-end mr-6 text-gray-700 mb-2"
          >
            <X size={24} />
          </button>

          {/* Links - centered */}
          {["Home"].map((item) => (
            <Link
              key={item}
              to="/"
              className="hover:bg-pink-600 hover:text-white px-6 py-3 rounded-md text-base font-medium bg-white/30 w-11/12 text-center"
            >
              {item}
            </Link>
          ))}
          {["Packages Deals","Facial","Waxing","Meni & Pedi","Hair Care","Make UP","Nail Art"].map((item) => (
            <Link
              key={item}
              to="/packages"
              className="hover:bg-pink-600 hover:text-white px-6 py-3 rounded-md text-base font-medium bg-white/30 w-11/12 text-center"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;
