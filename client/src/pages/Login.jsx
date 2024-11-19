import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../context/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2'
import logo from "../assets/images/ecomer.png"

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


    return <div className="mx-auto max-w-7xl h-screen flex justify-center flex-col items-center px-5">

        <div className="max-w-[600px] w-full bg-white rounded-lg md:p-10 px-5 py-6  ">
            <img className="md:w-[78px] md:h-[78px] w-12 h-12 mx-auto " src={logo} alt="Ecomer logo" />
            <h3 className="text-xl md:text-[32px] leading-[160%] font-semibold text-center my-5 md:my-8 text-[#232327]">Welcome to eComer</h3>
            <div className="flex w-full justify-center">
                <button onClick={handleGoogleLogin} className="flex items-center text-base font-semibold gap-2 leading-[150%] rounded-[4px] hover:bg-black px-5 py-3 w-full justify-center bg-[#232327] text-white"> <FaGoogle />  Continue with Google</button>
            </div>

            {/* Notice */}
            <div className="w-full mt-5">
                <p className="text-sm md:text-base text-center font-normal leading-[160%] text-[#696969]"><span className="text-[#232327] font-medium">Note: </span>Email us at <Link className="text-[#232327] font-medium underline" to="mailto:hello@framax.co">hello@framax.co</Link> if you are facing any issues with login.</p>
            </div>
        </div>



    </div>




}

export default Login