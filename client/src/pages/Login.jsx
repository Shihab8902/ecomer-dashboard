import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../context/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2'

const Login = () => {

    const navigate = useNavigate();
    const { createUser } = useContext(UserContext);


    //Handle Google Login
    const handleGoogleLogin = () => {
        createUser()
            .then(res => {
                if (res?.user) {
                    Swal.fire({
                        text: "Logged in successfully.",
                        showConfirmButton: false,
                        timer: 1500,
                        icon: "success"
                    });
                    navigate("/");
                }

            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                })
            })
    }


    return <div className="mx-auto max-w-7xl h-screen flex justify-center flex-col items-center">

        <div className="max-w-[400px] md:min-w-[400px] bg-[#FDFDFF] p-8 border border-[#EBEBEE]">
            <img className="w-10 mx-auto mb-3" src="ecomer.png" alt="Ecomer logo" />
            <h3 className="text-2xl font-semibold text-center mb-6 text-[#232327]">Welcome to eComer</h3>
            <div className="flex w-full justify-center">
                <button onClick={handleGoogleLogin} className="flex items-center text-base font-semibold gap-2 rounded-md hover:bg-black px-5 py-3 w-full justify-center bg-[#232327] text-white"> <FaGoogle className="text-xl" />  Continue with Google</button>
            </div>
        </div>

        {/* Notice */}
        <div className="  rounded-md p-2 shadow-sm max-w-[400px] md:min-w-[400px] mx-auto mt-6 flex  gap-4">
            <p className="font-semibold text-base mb-1">Notice:</p>
            <p className="text-sm">
                Email us at{" "}
                <Link
                    to="mailto:hello@framax.co"
                    className="underline  font-medium "
                >
                    hello@framax.co
                </Link>{" "}
                if you are facing any issues with login.
            </p>
        </div>

    </div>




}

export default Login