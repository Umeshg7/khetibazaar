import React from 'react'
import { Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form"
const Modal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => console.log(data)

  return (
    <dialog id="my_modal_3" className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Please Login your account!</h3>
      {/* email */}
      <div className="modal-action flex flex-col justify-center mt-0">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered"
          {...register("email")}
          />
        </div>
        {/* password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered"
          {...register("password")}
          />
          <label className="label mt-1">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>

        {/* Login  button */}
        <div className="form-control mt-6">
          <input type="Submit" value="Login" className="btn bg-green"/>
        </div>
        <p className="text-center my-2">Do not have an Account? <Link to ="/signup"
        className="underline text-red ml-1"> Signup Now</Link>
        </p>

        <button 
        htmlFor="my_modal_3"
        onClick={()=>document.getElementById('my_modal_3').close()} 
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</button>
      </form>
      {/* social sigin */}
      <div className="text-center space-5 mb-5">
      <button 
       className="btn btn-wide bg-green"> <FcGoogle  size={30}/> Login with Google account</button>
      </div>
      </div>
    </div>
  </dialog> 
  )
}

export default Modal