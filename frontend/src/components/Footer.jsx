import React from "react"; // Importing React library for JSX support
const Footer = () => {
  return (
    <div className="bg-white">
      {/* Main footer section with links and company information */}
      <footer className="footer xl:px-24 py-10 px-4 text-base-content bg-white">
        <aside>
          {/* Company logo */}
          <img src="/images/logo2.png" alt="" style={{ width: '250px', height: '80px' }}/>
          <p className="my-3 md:w-60">
            Explore the essence of freshness where every harvest is a testament to nature bounty.
          </p>
        </aside>
        {/* Navigation section for useful links */}
        <nav>
          <header className="footer-title text-black">Useful links</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">Blogs</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        {/* Navigation section for main menu links */}
        <nav>
          <header className="footer-title">Main Menu</header>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Offers</a>
          <a className="link link-hover">Menus</a>
          <a className="link link-hover">Reservation</a>
        </nav>
        {/* Navigation section for contact information */}
        <nav>
          <header className="footer-title">Contact Us</header>
          <a className="link link-hover">khetibazaar@gmail.com</a>
          <a className="link link-hover">+977 987654321</a>
          <a className="link link-hover">facebook.com</a>
          <a className="link link-hover">whatsapp</a>
        </nav>
      </footer>
      {/* Divider to separate footer sections */}
      <hr />
      {/* Secondary footer section for copyright and social media links */}
      <footer className="footer items-center xl:px-24 px-4 py-4 mt-2 bg-white">
        <aside className="items-center grid-flow-col bg-white">
          {/* Copyright information */}
          <p>Copyright © 2024 - All rights reserved</p>
        </aside>
        {/* Social media links */}
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          {/* Twitter icon */}
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M24 4.557c..."></path>
            </svg>
          </a>
          {/* YouTube icon */}
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M19.615 3.184..."></path>
            </svg>
          </a>
          {/* Facebook icon */}
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M9 8h-3..."></path>
            </svg>
          </a>
        </nav>
      </footer>
    </div>
  );
};
export default Footer; // Exporting the Footer component for use in other parts of the application
