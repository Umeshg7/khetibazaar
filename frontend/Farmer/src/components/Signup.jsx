import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form"
import Modal from './Model';
import { Link } from "react-router-dom"

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => console.log(data)

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex item-center justify-center my-20">
            <div className="modal-action flex flex-col justify-center mt-0">
            <h3 className="font-bold text-lg">Create an Account</h3>
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
        <input type="Submit" value="Signup" className="btn bg-green"/>
      </div>
      <p className="text-center my-2">Already have an Account? {" "}
      <button  className="underline text-red ml-1" 
      onClick={()=>document.getElementById('my_modal_3').showModal()} >
         Login</button>{" "}
      </p>
      <Link
      to="/"
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</Link>
    </form>
    {/* social signin */}
    <div className="text-center space-x-6 mb-5">
    <button 
       className="btn btn-wide bg-green"> <FcGoogle  size={25}/> Signin with Google account</button>
    </div>
    </div>
    <Modal/>

    </div>

  )
}

export default Signup