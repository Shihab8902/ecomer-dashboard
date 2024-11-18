import { useContext } from "react";
import TopBar from "../components/TopBar"
import { UserContext } from "../context/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";


const PaymentRequest = () => {


    const { user } = useContext(UserContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();



    //Handle for submit
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const providerName = e.target.providerName.value;
        const providerWebsite = e.target.providerWebsite.value;
        const providerAPI = e.target.providerAPI.value;
        const description = e.target.description.value;

        const data = {
            user: user?.email,
            providerName,
            providerWebsite,
            providerAPI,
            description
        }

        axiosPublic.put("/payment/request", data)
            .then(res => {
                if (res.data === "success") {
                    Swal.fire({
                        title: "Sent!",
                        text: "Your message has been successfully sent. We'll get back to you shortly!",
                        icon: "success"
                    });
                    navigate(-1);
                    e.target.reset();
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




    return <main >

        {/* Top bar */}
        <TopBar title="Payment methods" subRoute={true} subRouteTitle="Payment request" />

        <div className=" max-w-7xl mx-auto px-5">
            <div className="pt-[88px] md:pt-[128px] min-h-screen max-w-[600px] mb-[70px] md:mb-0 mx-auto ">

                <form onSubmit={handleFormSubmit} className="px-4 py-6 md:p-10 bg-white rounded-lg">
                    <div>
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="providerName">Payment provider name <span className="text-[#E93725]">*</span></label>
                        <input className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]" type="text" name="providerName" placeholder="Enter provider name" required />
                    </div>

                    <div className="mt-2">
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="providerWebsite">Provider website link <span className="text-[#E93725]">*</span></label>
                        <input className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]" type="text" name="providerWebsite" placeholder="Enter website link" required />
                    </div>

                    <div className="mt-2">
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="providerAPI">Service provider API link <span className="text-[#23232766]">(optional)</span></label>
                        <input className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]" type="text" name="providerAPI" placeholder="Enter API link" />
                    </div>

                    <div className="mt-2">
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="Reason">Describe why you need the payment method <span className="text-[#E93725]">*</span></label>
                        <textarea className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969] min-h-28" name="description" placeholder="Write Description..." required />
                    </div>

                    <div className="flex w-full justify-end">
                        <input className="w-[130px] bg-[#232327] text-white cursor-pointer py-3 mt-5 hover:bg-black rounded" type="submit" value="Send" />
                    </div>
                </form>

            </div>
        </div>


        <div className='md:hidden '>
            <BottomBar />
        </div>


    </main>

}
export default PaymentRequest