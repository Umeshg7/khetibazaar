import React, { useState,useRef, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { Link, useNavigate } from 'react-router-dom'; // React router for navigation
import { FaRegUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart'; // Custom hook to manage cart state
import Modal from './Model';
import Profile from './Profile'; // User profile component
import logo from '/images/logo2.png'; // Our logo

const Navbar = () => {
  const [isSticky, setSticky] = useState(false); // State for sticky navbar
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { user } = useAuth(); // Get user from AuthContext
  const [cart] = useCart(); // Get cart items
  const navigate = useNavigate(); // To navigate programmatically
  const [activeDropdown, setActiveDropdown] = useState(null); // State for active dropdown
  const dropdownRefs = {
    products: useRef(null),
    services: useRef(null),
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleClickOutside = (e) => {
    if (
      activeDropdown &&
      dropdownRefs[activeDropdown] &&
      !dropdownRefs[activeDropdown].current.contains(e.target)
    ) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setSticky(offset > 0); // If scrolled down, make navbar sticky
    };
    window.addEventListener("scroll", handleScroll);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },); // Re-run effect when `activeDropdown` changes

  // Debounced search function to avoid too many API requests
  const debouncedSearch = debounce(async (query) => {
    if (query.length > 1) {
      try {
        const response = await axios.get(`http://localhost:678/search?query=${query}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  }, 3);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchQuery(suggestion.name);
    navigate(`/products/${suggestion._id}`); // Navigate to product detail page
    setSuggestions([]); // Clear suggestions
  };

  const handleCartClick = () => {
    if (user) {
      navigate('/cart-page');
    } else {
      Swal.fire({
        title: 'Please login to see your cart',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!',
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById('my_modal_5').showModal();
        }
      });
    }
  };

  const navItems = (
    <>
      <li>
        <Link to="/" className="text-lg">
          Home
        </Link>
      </li>
      <li tabIndex={0} ref={dropdownRefs}>
        <div onClick={() => toggleDropdown('products')}>
          <span className="text-lg cursor-pointer">My products</span>
          <span>{activeDropdown === 'products' ? '▲' : '▼'}</span>
        </div>
        {activeDropdown === 'products' && (
          <ul className="p-2 bg-white shadow rounded absolute z-[1] mt-2">
            <li>
              <a href="/products">All</a>
            </li>
            <li>
              <a href="/vegetables">Vegetables</a>
            </li>
            <li>
              <a href="/fruits">Fruits</a>
            </li>
            <li>
              <Link to="/grains">Grains</Link>
            </li>
            <li>
              <Link to="/eggandmeat">Fresh Meat</Link>
            </li>
            <li>
              <Link to="/drinks">Fresh Drinks</Link>
            </li>
          </ul>
        )}
      </li>
      <li tabIndex={0} ref={dropdownRefs}>
        <div onClick={() => toggleDropdown('services')}>
          <span className="text-lg cursor-pointer">Our Services</span>
          <span>{activeDropdown === 'services' ? '▲' : '▼'}</span>
        </div>
        {activeDropdown === 'services' && (
          <ul className="p-2 bg-white shadow rounded absolute z-[1] mt-2">
            <li>
              <a href='/'>Online Order</a>
            </li>
            <li>
              <a href='/'>Vegetables Booking</a>
            </li>
            <li>
              <a href='/'>Order Tracking</a>
            </li>
          </ul>
        )}
      </li>
      <li>
        <Link to="/aboutus" className="text-lg">
          About us
        </Link>
      </li>
    </>
  );



  return (
    <header className="max-w-screen-2x1 container mx-auto fixed top-0 right-0 transition-all duration-300 ease-in-out">
      <div className={`navbar px-4 ${isSticky ? 'shadow-md bg-base-100 transition-all duration-300 ease-in-out' : ''}`}>
        <div className="navbar-start" style={{ paddingLeft: '30px' }}>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-48">
              {navItems}
            </ul>
          </div>
          <a href='/'>
            <img src={logo} alt='logo' style={{ width: '300px', height: '90px' }} />
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>

        <div className="navbar-end " style={{ paddingRight: '40px' }}>
          {/* Search input and suggestions */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="input input-bordered w-40 md:w-auto"
            />

            {/* Dropdown suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-10 bg-white border border-gray-300 rounded shadow-lg w-full">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart button */}
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-4 lg:flex hidden items-center justify_center" onClick={handleCartClick}>
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 a2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item">{cart.length || 0}</span>
            </div>
          </div>

          {/* login button */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white"
            >
              <FaRegUser /> Login
            </button>
          )}

          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
