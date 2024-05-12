import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { MdShoppingCartCheckout } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { MdReportProblem } from "react-icons/md";

import { IoLogOut } from "react-icons/io5";




// eslint-disable-next-line react/prop-types
const Profile = ({user}) => {
    const {logOut} = useContext(AuthContext)
    const handleLogout = () => {
        logOut().then(() => {
            //signout
            alert("Logout Successfull!")
        }).catch((error) => {
            //error
        })

    }
    
  return (
    <div>
        <div className="drawer drawer-end z-50">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar">
    <div className="w-10 rounded-full">
    {
      
        // eslint-disable-next-line react/prop-types
        user.photoURL ? <img
        alt="profile"
        // eslint-disable-next-line react/prop-types
        src={user.photoURL}
         /> : <img alt='' src='https://i.ibb.co/NWZfwBn/636285684763067730-Genius-Portraits-001-modified.png'/>
    }
     </div>
        </label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      
      <li>
        <a href= "/update-profile"><CgProfile size={25}/>Profile</a>
        </li>
        <li>
        <a href= "/favorite"> <MdFavoriteBorder size={25} />Your Favourite</a>
        </li>
      <li>
        <a href='/order'> <MdShoppingCartCheckout size={25} />Order</a>
        </li>

        <li>
        <Link to= "/dashboard"><MdDashboardCustomize size={25} />Dashboard</Link>
        </li>

        <li>
        <Link to= "/report-problem" ><MdReportProblem size={25}/>Report a Problem</Link>
        </li>

      <li>
        <a onClick={handleLogout}><IoLogOut size={25} />Logout</a>
        </li>


    </ul>
  </div>
</div>
    </div>
  )
}

export default Profile
