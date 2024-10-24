import { useContext } from "react";
import TopBar from "../components/TopBar"
import { UserContext } from "../context/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


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













    return <main className="max-w-7xl mx-auto px-5">

        {/* Top bar */}
        <TopBar title="Payment Request" />

        <div className="my-5 max-w-[450px] md:min-w-[450px] mx-auto border p-5 bg-[#FDFDFF] border-[#EBEBEE]  mt-20">

            <form onSubmit={handleFormSubmit}>
                <div>
                    <label className="text-base mb-1 block font-medium" htmlFor="providerName">Name of the payment service provider*</label>
                    <input className="w-full rounded py-[10px] px-3 border border-[#EBEBEE] placeholder:text-sm  outline-gray-100" type="text" name="providerName" placeholder="Enter provider name" required />
                </div>

                <div className="mt-4">
                    <label className="text-base mb-1 block font-medium" htmlFor="providerWebsite">Provider website link*</label>
                    <input className="w-full py-[10px] rounded px-3 border border-[#EBEBEE] placeholder:text-sm  outline-gray-100" type="text" name="providerWebsite" placeholder="Enter website link" required />
                </div>

                <div className="mt-4">
                    <label className="text-base mb-1 block font-medium" htmlFor="providerWebsite">Service provider API link <span className="text-gray-400">(optional)</span></label>
                    <input className="w-full py-[10px] px-3 border rounded border-[#EBEBEE] placeholder:text-sm  outline-gray-100" type="text" name="providerAPI" placeholder="Enter API link" />
                </div>

                <div className="mt-4">
                    <label className="text-base mb-1 block font-medium" htmlFor="providerWebsite">Describe why you need this payment method*</label>
                    <textarea className="w-full py-[10px] px-3 min-h-24 border rounded border-[#EBEBEE] placeholder:text-sm  outline-gray-100" name="description" placeholder="Enter Description" required />
                </div>

                <input className="w-full bg-[#232327] text-white cursor-pointer py-2 mt-4 hover:bg-black rounded" type="submit" value="Send" />
            </form>

        </div>


    </main>

}
export default PaymentRequest