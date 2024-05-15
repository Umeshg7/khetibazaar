import React from "react";
import { FaUtensils } from "react-icons/fa"; // Importing the utensil icon from react-icons library
import { useForm } from "react-hook-form"; // Importing form handling functions from react-hook-form library
import useAxiosPublic from "../../../hooks/useAxiosPublic"; // Custom hook for making public axios requests
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Custom hook for making secure axios requests
import Swal from "sweetalert2"; // Importing SweetAlert2 for displaying alerts

//Adding AddMenu Section for Admin Panel
const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm(); // Destructuring form handling functions from useForm hook
  const axiosPublic = useAxiosPublic(); // Custom hook instance for making public axios requests
  const axiosSecure = useAxiosSecure(); // Custom hook instance for making secure axios requests

  // Retrieving image hosting key from environment variables
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  // Constructing image hosting API endpoint with the retrieved key
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Creating FormData object with the selected image file
      const imageFile = { image: data.image[0] };
      // Sending image to image hosting API using public axios instance
      const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Checking if image hosting was successful
      if (hostingImg.data.success) {
        // Constructing menu item object with form data and hosted image URL
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          description: data.description,
          image: hostingImg.data.data.display_url,
        };

        // Adding menu item to database using secure axios instance
        const response = await axiosSecure.post("/menu", menuItem);

        // Displaying success message if menu item was added successfully
        if (response.status === 200 || response.status === 201) {
          reset(); // Resetting form fields
          // Displaying success alert
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your item has been added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
      // Displaying error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green">Product Item</span>
      </h2>

      {/* Form */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Name Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Product Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Category and Price Fields */}
          <div className="flex items-center gap-4">
            {/* Category Field */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="meat">Meat</option>
                <option value="grains">Grains</option>
                <option value="drinks">Drinks</option>
                <option value="dairy">Dairy</option>
              </select>
            </div>

            {/* Price Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Description Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Add product description here !"
            />
          </div>

          {/* Image Upload Field */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn bg-green text-white px-6">
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
