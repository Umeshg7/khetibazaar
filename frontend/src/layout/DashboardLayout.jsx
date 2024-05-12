import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { MdDashboard, MdPerson, MdAddCircle, MdEvent, MdShoppingCart } from 'react-icons/md';
import { MdDashboardCustomize } from "react-icons/md";
import { FaLocationArrow, FaQuestion, FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa6";

const sharedLinks=(
  <>
              <li>
              <Link to="/">
              <IoHome />Home
              </Link>
            </li>
            <li>
              <Link to="/products"><FaCartArrowDown />Products</Link>
            </li>
            <li>
              <Link to="/products"><FaLocationArrow/>Orders Tracking</Link>
            </li>
            <li>
              <Link to="/products"><FaQuestion/>Customer Support</Link>
            </li>
  </>
)


const DashboardLayout = () => {
  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
          <label htmlFor="my-drawer-2" 
          className="btn btn-primary drawer-button lg:hidden">
           <MdDashboardCustomize />
          </label>
          <button className="btn rounded-full px-6 bg-grey flex items-center gap-2 text-black sm:hidden">
            <FaUser />Logout</button>
          </div>
          <div className="mt-5, md:mt-2 mx-4">

          <Outlet />

          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard" className="flex justify-start mb-3">
                <img src="/logo2.png" alt="Logo" className= "w-20"/>
                <span className="badge badge-primary">Admin</span>
              </Link>
            </li>
            <hr />
            <li className="mt-3">
              <Link to="/dashboard">
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users">
                <MdAddCircle /> Add Products
              </Link>
            </li>
            <li>
              <Link to="/dashboard/bookings">
                <MdEvent /> Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard/orders">
                <MdShoppingCart /> Manage Orders
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/dashboard/users">
                <MdPerson /> All Users
              </Link>
            </li>
            {/* shared nav links */}
            {
              sharedLinks
            }


          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
