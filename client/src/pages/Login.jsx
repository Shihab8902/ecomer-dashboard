import { Link, useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "../context/AuthProvider";
import Swal from 'sweetalert2'

const Login = () => {

    const navigate = useNavigate();

    //Handle password visibility
    const [visiblePassword, setVisiblePassword] = useState(false);
    const { loginUser } = useContext(UserContext);


    //Handle Login
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        loginUser(email, password)
            .then(() => {
                Swal.fire({
                    text: "Logged in successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/")

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

        <div className="max-w-[500px] min-w-[500px] bg-[#FDFDFF] p-8 border border-[#EBEBEE]">
            <h3 className="text-4xl font-semibold text-center mb-10 text-[#232327]">Welcome Back!</h3>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4" >

                {/* Email field */}
                <div>
                    <label className="block text-[#232327] font-normal text-base leading-6 mb-2" htmlFor="email">Email Address</label>
                    <input className="w-full p-3 border border-[#D3D3D4]" type="email" name="email" id="email" placeholder="Enter your email" required />

                </div>

                {/* Password field */}
                <div className="relative">
                    <label className="block text-[#232327] font-normal text-base leading-6 mb-2" htmlFor="password">Password</label>
                    <input className="w-full p-3 border border-[#D3D3D4]" type={visiblePassword ? "text" : "password"} name="password" id="password" placeholder="Enter password" required />
                    <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-4 right-2 text-lg text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>

                <button type="submit" className="w-full bg-[#232327] font-semibold p-3 text-white mt-3">Login</button>
            </form>

            <p className="text-center mt-6 text-[#232327] leading-6 text-base">Don't have an account? <Link className="font-bold hover:underline" to="/register">Register</Link></p>

        </div>

    </div>




}

export default Login