import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc"; // Importing Google icon from react-icons library
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importing necessary modules from react-router-dom library
import { useForm } from "react-hook-form"; // Importing useForm hook from react-hook-form library
import Modal from "./Model"; // Importing the Modal component
import { AuthContext } from "../contexts/AuthProvider"; // Importing AuthContext from custom context provider

// Defining the Signup component
const Signup = () => {
    // Destructuring properties from useForm hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Destructuring createUser and login functions from AuthContext
    const {createUser, login} = useContext(AuthContext);

    // Getting current location and navigation function from react-router-dom
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"; // Defining default path or path from which navigation occurred

    // Function to handle form submission
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        // Creating user with provided email and password
        createUser(email, password).then((result) => {
            // Signed up successfully
            const user = result.user;
            alert("Account creation successfully done!");
            document.getElementById("my_modal_5").close(); // Closing the modal after successful signup
            navigate(from, {replace: true}); // Navigating to previous page or default page
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle error
        });
    };

    // Rendering the Signup component
    return (
        <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
            <div className="modal-action flex flex-col justify-center mt-0">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                    <h3 className="font-bold text-lg">Create A Account!</h3>

                    {/* Email input field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            className="input input-bordered"
                            {...register("email")} // Registering email input with react-hook-form
                        />
                    </div>

                    {/* Password input field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            {...register("password")} // Registering password input with react-hook-form
                        />
                        <label className="label mt-1">
                            <a href="#" className="label-text-alt link link-hover">
                                Forgot password?
                            </a>
                        </label>
                    </div>

                    {/* Signup button */}
                    <div className="form-control mt-6">
                        <input
                            type="submit"
                            value="Signup"
                            className="btn bg-green text-white"
                        />
                    </div>

                    {/* Link to login page */}
                    <p className="text-center my-2">
                        Have an account?{" "}
                        <button className="underline text-red ml-1" onClick={() => document.getElementById("my_modal_5").showModal()}>
                            Login
                        </button>{" "}
                    </p>

                    {/* Close button */}
                    <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                </form>

                {/* Social sign in button */}
                <div className="text-center space-x-3 mb-5">
                    <button className="btn hover:bg-green hover:text-white" style={{ width: '400px' }}>
                        <FcGoogle /> Signup with Google
                    </button>
                </div>
            </div>
            <Modal /> {/* Rendering the Modal component */}
        </div>
    );
};

export default Signup; // Exporting the Signup component




