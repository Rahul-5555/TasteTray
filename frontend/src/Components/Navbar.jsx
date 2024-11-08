import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../modal';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';
import { BsCart3 } from "react-icons/bs";


export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("authToken");  // Remove the auth token from local storage
    navigate("/login");  // Redirect to the login page
  };

  return (
    <div>
      <nav className="bg-orange-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link className="text-3xl font-semibold text-white italic" to="/">TasteTray</Link>

          {/* Toggle Button for Mobile */}
          <button className="lg:hidden text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="hidden lg:flex space-x-6">
            <Link className="text-lg text-white hover:text-gray-300 transition-colors" to="/">Home</Link>

            {/* Show My Orders if Logged In */}
            {/* {localStorage.getItem("authToken") && (
              <Link className="text-lg text-white hover:text-gray-300 transition-colors" to="/myOrder">My Orders</Link>
            )} */}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Show Login and SignUp if Not Logged In */}
            {!localStorage.getItem('authToken') ? (
              <div className="flex space-x-3">
                <Link className="px-4 py-2 text-sm bg-white text-orange-600 rounded-lg hover:bg-green-100 transition-all" to={"/login"}>Login</Link>
                <Link className="px-4 py-2 text-sm bg-white text-orange-600 rounded-lg hover:bg-green-100 transition-all" to={"/createuser"}>Sign Up</Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ">
                {/* Cart Button with Badge */}
                <button className="text-sm bg-white text-green-600 py-2 px-4 rounded-lg hover:bg-green-100 transition-all flex items-center space-x-2" onClick={() => setCartView(true)}>
                  <span><BsCart3 /></span>
                  <Badge pill bg="danger">{data.length}</Badge>
                </button>

                {/* Show Cart Modal */}
                {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}

                {/* Logout Button */}
                  <button className="w-full sm:w-auto text-sm bg-white text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition-all flex items-center justify-center" onClick={handleLogout}>
                    Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
