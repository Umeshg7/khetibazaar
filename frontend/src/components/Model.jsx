import React, { useContext, useState } from "react"; // Importing necessary modules from React library
import { FaGoogle } from "react-icons/fa"; // Importing Google icon from react-icons library
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importing necessary modules from react-router-dom library
import { useForm } from "react-hook-form"; // Importing useForm hook from react-hook-form library
import { AuthContext } from "../contexts/AuthProvider"; // Importing AuthContext from custom context provider

// Defining the Modal component
const Modal = () => {
    // Destructuring properties from useForm hook
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    // Destructuring signUpWithGmail and login functions from AuthContext
    const {signUpWithGmail, login} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(""); // Initializing state for error message

    // Getting current location and navigation function from react-router-dom
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"; // Defining default path or path from which navigation occurred

    // Function to handle form submission
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        // Logging in with provided email and password
        login(email, password).then((result) => {
            const user = result.user;
            alert("Login successfull");
            document.getElementById("my_modal_5").close(); // Closing the modal after successful login
            navigate(from, {replace: true}); // Navigating to previous page or default page
        }).catch((error) => {
            const errorMessage = error.message;
            setErrorMessage("Provide a correct email and password!"); // Setting error message for invalid login attempt
        });
    };

    // Function to handle Google sign-in
    const handleLogin = () => {
        signUpWithGmail().then((result) => {
            const user = result.user;
            alert("Login successfull!"); // Alerting user on successful login
            navigate(from, {replace: true}); // Navigating to previous page or default page
        }).catch((error) => console.log(error)); // Logging any errors to console
    };

    // Rendering the modal component
    return (
        <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
            <div className="modal-box">
                <div className="modal-action flex flex-col justify-center mt-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                        <h3 className="font-bold text-lg">Please Login!</h3>

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

                        {/* Error message for invalid login attempt */}
                        {
                            errorMessage ? <p className="text-red text-xs italic">{errorMessage}</p> : ""
                        }

                        {/* Login button */}
                        <div className="form-control mt-4">
                            <input
                                type="submit"
                                value="Login"
                                className="btn bg-green text-white"
                            />
                        </div>

                        {/* Link to signup page */}
                        <p className="text-center my-2">
                            Donot have an account?{" "}
                            <Link to="/signup" className="underline text-red ml-1">
                                Signup
                            </Link>{" "}
                        </p>

                        {/* Close modal button */}
                        <button 
                            htmlFor="my_modal_5"
                            onClick={() => document.getElementById("my_modal_5").close()} // Closing the modal
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                        </button>
                    </form>

                    {/* Google sign-in button */}
                    <div className="text-center space-x-3 mb-5">
                        <button className="btn hover:bg-grey hover:text-white" onClick={handleLogin} style={{ width: '450px' }}>
                            <FaGoogle /> Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default Modal; // Exporting the Modal component
