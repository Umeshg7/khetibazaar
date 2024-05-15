import React from "react";
import useMenu from "../../../hooks/useMenu"; // Importing custom hook for fetching menu items
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing edit and delete icons from react-icons
import Swal from "sweetalert2"; // Importing SweetAlert2 for displaying alerts
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Importing custom hook for making secure axios requests

// Component for managing menu items
const ManageItems = () => {
  const [menu, , refetch] = useMenu(); // Fetching menu items using custom hook
  const axiosSecure = useAxiosSecure(); // Custom hook instance for making secure axios requests

  // Function to handle item deletion
  const handleDeleteItem = (item) => {
    // Display confirmation dialog before deleting item
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // If user confirms deletion, send delete request to server
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res) {
          // If deletion is successful, refetch menu items and display success message
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Menu Items</span>
      </h2>
      {/* Menu item table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* Table head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping through menu items and displaying them */}
              {menu.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>NPR : {item.price}</td>
                  {/* Edit button */}
                  <td>
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="btn btn-ghost btn-xs bg-orange-500 text-white">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  {/* Delete button */}
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-xs text-red"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
