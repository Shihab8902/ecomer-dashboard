import { Link, useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from 'sweetalert2'

const Register = () => {

    const navigate = useNavigate();

    const { createUser } = useContext(UserContext);

    //Handle password visibility
    const [visiblePassword, setVisiblePassword] = useState(false);


    //Handle Registration
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        createUser(email, password)
            .then(userCredential => {
                updateProfile(userCredential.user, {
                    displayName: name
                })
                    .then(() => {
                        Swal.fire({
                            text: "Account registered successfully!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/")
                    })

            })
            .catch(error => {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error"
                })
            })



    }

    return <div className="mx-auto max-w-6xl h-screen flex justify-center items-center">

        <div className="w-1/3 shadow-xl p-6">
            <h3 className="text-4xl font-semibold text-center mb-10">Register Account.</h3>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
                {/* Name field */}
                <div>
                    <label className="block text-lg mb-1 font-medium" htmlFor="name">Name</label>
                    <input className="w-full p-3 border border-[#232327]" type="text" name="name" id="name" placeholder="Enter your name" />
                </div>

                {/* Email field */}
                <div>
                    <label className="block text-lg mb-1 font-medium" htmlFor="email">Email*</label>
                    <input className="w-full p-3 border border-[#232327]" type="email" name="email" id="email" placeholder="Enter your email" required />

                </div>

                {/* Password field */}
                <div className="relative">
                    <label className="block text-lg mb-1 font-medium" htmlFor="password">Password*</label>
                    <input className="w-full p-3 border border-[#232327]" type={visiblePassword ? "text" : "password"} name="password" id="password" placeholder="Minimum 6 character" required />
                    <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-4 right-2 text-lg text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>

                <button type="submit" className="w-full bg-[#232327] p-3 text-white mt-3">Register</button>
            </form>

            <p className="text-center mt-3">Already have an account? <Link className="underline" to="/login">Login</Link></p>

        </div>

    </div>




}

export default Register