// components/admin/AddChatMessage.jsx
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import Swal from "sweetalert2";

const AddChatMessage = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.post("/chat", data);

      if (response.status === 201) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Chat message sent successfully!",
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
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Send a New <span className="text-green">Chat Message</span>
      </h2>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Sender*</span>
            </label>
            <input
              type="text"
              {...register("sender", { required: true })}
              placeholder="Sender"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Message*</span>
            </label>
            <textarea
              {...register("message", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Enter your message here"
            />
          </div>

        <div className=" pt-10">
        <button type="submit" className="btn bg-green text-white px-6 ">
            Add to Chat DB 
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddChatMessage;
