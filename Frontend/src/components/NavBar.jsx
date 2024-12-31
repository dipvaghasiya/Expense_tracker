import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-xl font-bold">
              Expense Manager
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/add-transaction" className="hover:text-gray-300">
              Add Transaction
            </Link>
            <Link to="/transaction-history" className="hover:text-gray-300">
              Transaction History
            </Link>
            <Link to="/manage-categories" className="hover:text-gray-300">
              Manage Categories
            </Link>
            {user ? (
              <>
                <span className="text-sm">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-700 px-4 py-2 rounded-md text-sm hover:bg-indigo-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-700 px-4 py-2 rounded-md text-sm hover:bg-indigo-800"
              >
                Login
              </Link>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col space-y-2 mt-2">
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/add-transaction" className="hover:text-gray-300">
              Add Transaction
            </Link>
            <Link to="/transaction-history" className="hover:text-gray-300">
              Transaction History
            </Link>
            <Link to="/manage-categories" className="hover:text-gray-300">
              Manage Categories
            </Link>
            {user ? (
              <>
                <span className="text-sm">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-700 px-4 py-2 rounded-md text-sm hover:bg-indigo-800 mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-700 px-4 py-2 rounded-md text-sm hover:bg-indigo-800 mt-2"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
