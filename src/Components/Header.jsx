import React from "react";
import logo from "../assets/img/Infinity-social-Logo.webp";

function Header() {
  return (
    <nav className="left-0 right-0 px-5 py-4 shadow-md z-99 fixed bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-24 sm:w-32  bg-teal-200">
          <img
            src={logo}
            alt="Infinity Social Logo"
            className="w-full h-auto object-contain"
          />
        </div>

        <div>
          <ul className="hidden lg:flex justify-end items-center gap-6">
            <li>
              <form action="submit" className="flex items-center space-x-2">
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                  className="px-2 py-1 rounded text-black border border-gray-700"
                />
                <input
                  type="submit"
                  value="Search"
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
                />
              </form>
            </li>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
          </ul>
          <button className="lg:hidden p-2 border border-transparent hover:border hover:border-black rounded-md cursor-pointer">
            <i className="fas fa-bars text-black"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
