import React from "react";

const Footer = () => {
  return (
    <div className="bg-white">
      {/* Main footer section with links and company information */}
      <footer className="footer xl:px-24 py-10 px-4 text-base-content bg-white flex flex-wrap justify-around">
        <aside className="w-full md:w-1/4 mb-8 md:mb-0">
          {/* Company logo */}
          <img src="/images/logo2.png" alt="" className="w-48 h-auto mb-4 mx-auto md:mx-0" />
          <p className="text-center md:text-left">
            Explore the essence of freshness where every harvest is a testament to natures bounty.
          </p>
        </aside>
        {/* Navigation section for useful links */}
        <nav className="w-full md:w-1/4 mb-8 md:mb-0">
          <header className="footer-title text-black text-center md:text-left">Useful links</header>
          <a href="/aboutus" className="block text-center md:text-left mt-2 md:mt-0 link link-hover">About us</a>
        </nav>
        {/* Navigation section for main menu links */}
        <nav className="w-full md:w-1/4 mb-8 md:mb-0">
          <header className="footer-title text-center md:text-left">Main Menu</header>
          <a href="/" className="block text-center md:text-left mt-2 md:mt-0 home">Home</a>
          <a href="/products" className="block text-center md:text-left mt-2 md:mt-0 link link-hover">Products</a>
        </nav>
        {/* Navigation section for contact information */}
        <nav className="w-full md:w-1/4">
          <header className="footer-title text-center md:text-left">Contact Us</header>
          <a href="mailto:khetibazaar@gmail.com" className="block text-center md:text-left mt-2 md:mt-0 link link-hover">khetibazaar@gmail.com</a>
          <a href="https://www.facebook.com" className="block text-center md:text-left mt-2 md:mt-0 link link-hover" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://wa.me/" className="block text-center md:text-left mt-2 md:mt-0 link link-hover" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </nav>
      </footer>
      {/* Divider to separate footer sections */}
      <hr className="w-full" />
      {/* Secondary footer section for copyright and social media links */}
      <footer className="footer items-center xl:px-24 px-4 py-4 mt-2 bg-white flex flex-wrap justify-between">
        <aside className="items-center">
          {/* Copyright information */}
          <p className="text-center md:text-left">Copyright © 2024 - All rights reserved</p>
        </aside>
        {/* Social media links */}
        <nav className="flex justify-center md:justify-end">
          {/* Twitter icon */}
          <a href="#" className="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M24 4.557c..."></path>
            </svg>
          </a>
          {/* YouTube icon */}
          <a href="#" className="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M19.615 3.184..."></path>
            </svg>
          </a>
          {/* Facebook icon */}
          <a href="#" className="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M9 8h-3..."></path>
            </svg>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
