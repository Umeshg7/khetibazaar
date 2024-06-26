import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import Login from "../components/Login";
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";

import logo from "/images/logoadmin.png";
import { FaCartShopping } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

// Shared Links
const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
      <Link to="/products">
        <FaCartShopping /> Menu
      </Link>
    </li>
    <li>
      <Link to="/order-tracking">
        <FaLocationArrow /> Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/dashboard/reported-problem">
        <FaQuestionCircle /> Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const {loading} = useAuth()
  const [isAdmin, isAdminLoading] = useAdmin()
  return (
    <div>
      {
        isAdmin ?         <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden">
              <FaRegUser /> Logout
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet /> {/* The main content based on routing */}
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard" className="flex justify-start mb-3">
                <img src={logo} alt="" className="w-50" />
              </Link>
            </li>
            <hr />
            <li className="mt-3">
              <Link to="/dashboard">
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-booking">
                <FaShoppingBag /> Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-menu">
                <FaPlusCircle />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-items">
                <FaEdit /> Manage Items
              </Link>
            </li>


            <li className="mb-3">
              <Link to="/dashboard/users">
                <FaUser /> All Users
              </Link>
            </li>
            <hr />
            {/* Shared nav links */}
            {sharedLinks}
          </ul>
        </div>
      </div> : <Login/>
      }
    </div>
  );
};

export default DashboardLayout;
