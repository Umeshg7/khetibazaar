import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

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
        alt="T"
        // eslint-disable-next-line react/prop-types
        src={user.photoURL}
         /> : <img alt='' src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'/>
    }
     </div>
        </label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li><a href= "/update-profile">Profile</a></li>
      <li><a>Order</a></li>
      <li><a>Setting</a></li>
      <li><a onClick={handleLogout}>Logout</a></li>
    </ul>
  </div>
</div>
    </div>
  )
}

export default Profile
