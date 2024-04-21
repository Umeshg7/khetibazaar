import React, { useContext, useEffect, useState } from 'react';
import logo from '/images/logo2.png';
import Modal from './Model';
import { AuthContext } from '../contexts/AuthProvider';
import Profile from './Profile'
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useCart from "../hooks/useCart";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  const {user} = useContext(AuthContext);
  console.log(user)
  const [cart,refetch] = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <a href='/' className='text-lg'>Home</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary><span className="text-lg">My products</span></summary>
          <ul className="p-2">
            <li>
              <a href='/products'>All</a>
            </li>
            <li>
              <a href='/vegetables'>Vegetables</a>
            </li>
            <li>
              <a>Fruits</a>
            </li>
            <li>
              <a>Grains</a>
            </li>
            <li>
              <a>Fresh Meat</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary><span className="text-lg">Our Services</span></summary>
          <ul className="p-2">
            <li>
              <a>Online Order</a>
            </li>
            <li>
              <a>Vegetables Booking</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
      <Link to="/error" className="text-lg">Offers</Link>

      </li>
      <li>
      <Link to="/aboutus" className="text-lg">About us</Link>

      </li>
    </>
  );

  return (
    <header className="max-w-screen-2x1 container mx-auto fixed top-0 right-0 transition-all duration-300 ease-in-out">
      <div className={`navbar px-4 ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
        <div className="navbar-start" style={{ paddingLeft: '30px' }}>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
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
        <div className="navbar-end" style={{ paddingRight: '40px' }}>
          <button className="btn btn-ghost btn-circle mr-3 hidden lg:flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>

        <Link to="cart-page">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-4 lg:flex hidden items-center justify_center">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="badge badge-sm indicator-item">{cart.length || 0}</span>
            </div>
          </div>
        </Link>

          {/* login button */}
          {
          user? <Profile user={user}/> :  <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white"
        >
          <FaRegUser /> Login
        </button>
         }
              <Modal/>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

