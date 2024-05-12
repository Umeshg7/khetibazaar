import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../contexts/AuthProvider"; // Import the AuthContext
import Swal from "sweetalert2";

const AddChatMessage = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); // Access the authenticated user's information from the AuthContext

  const onSubmit = async (data) => {
    try {
      // Merge the user's name with the form data
      const formData = { ...data, sender: user?.displayName };
      
      const response = await axiosSecure.post("/chat", formData);

      if (response.status === 201) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Report sent successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error sending chat message:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto mt-20 pt-5">
      <h2 className="text-2xl font-semibold my-4">
        Report  <span className="text-green">a Problem</span>
      </h2>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mt-7">
            <label className="label">
              <span className="label-text">Problem description</span>
            </label>
            <textarea
              {...register("message", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Enter your message here"
            />
          </div>

        <div className=" pt-5">
        <button type="submit" className="btn bg-green text-white px-6 ">
            Send 
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddChatMessage;
