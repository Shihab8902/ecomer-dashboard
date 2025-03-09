import { useLocation, useNavigate } from "react-router-dom"
import TopBar from "../../components/TopBar"
import BottomBar from "../../components/BottomBar";
import useStoreInfo from "../../hooks/useStoreInfo";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const EditShippingMethod = () => {

    //Hooks
    const location = useLocation();
    const navigate = useNavigate();
    const { currentStore, refetchStore } = useStoreInfo();
    const method = location.state;
    const axiosPublic = useAxiosPublic();

    //States
    const [priceTyped, setPriceTyped] = useState(parseFloat(method?.price) > 0 ? true : false);





    //handle shipping profile update
    const handleShippingProfileUpdate = (e) => {
        e.preventDefault();
        const data = {
            id: method?.id,
            profileName: e.target.profileName.value,
            rateType: e.target.rateType.value,
            rateName: e.target.rateName.value,
            deliveryDescription: e.target.deliveryDescription.value,
            price: e.target.price.value || "0"
        }

        //Update store
        axiosPublic.put(`/store?id=${currentStore?._id}`, { shippingMethods: currentStore?.shippingMethods.map(item => item.id === method?.id ? data : item) })
            .then(res => {
                if (res.data) {
                    refetchStore();
                    navigate(-1);
                    Swal.fire({
                        text: "Shipping profile updated",
                        showConfirmButton: false,
                        timer: 1500,
                        icon: "success"
                    })
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



    //Handle delete
    const handleDelete = () => {
        Swal.fire({
            title: "Delete?",
            text: "Are you sure want to delete the shipping profile?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6"
        }).then((result) => {
            if (result.isConfirmed) {
                //Update store
                axiosPublic.put(`/store?id=${currentStore?._id}`, { shippingMethods: currentStore?.shippingMethods.filter(item => item.id !== method?.id) })
                    .then(res => {
                        if (res.data) {
                            refetchStore();
                            navigate(-1);
                            Swal.fire({
                                text: "Shipping profile deleted",
                                showConfirmButton: false,
                                timer: 1500,
                                icon: "success"
                            })
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
        })
    }



    return <main>
        <TopBar title="Shipping" subRoute={true} subRouteTitle={method?.profileName} />

        <form className="max-w-7xl px-5 mx-auto" onSubmit={handleShippingProfileUpdate}>

            {/* Content boxes */}
            <div className="w-full max-w-[600px] mb-[80px] md:mb-0 min-h-screen  mx-auto pt-[88px] md:pt-[128px] pb-5">

                {/* Profile name & type */}
                <div className="w-full bg-white py-3 md:py-5 px-4 md:px-8 rounded-[4px] md:rounded-lg">

                    {/* Profile name */}
                    <div className="">
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="profileName">Profile Name</label>
                        <input defaultValue={method?.profileName} className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]" type="text" name="profileName" id="profileName" placeholder="Enter profile name" required />
                        <p className="text-[#696969] font-normal text-sm leading-[140%] mt-1">{`Customers won't see this`}</p>
                    </div>
                    {/* Rate type */}
                    <div className="mt-3">
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="rateType">Shipping Rate</label>
                        <select defaultValue={method?.rateType} className="w-full border-r-8 border-r-transparent outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal " name="rateType" id="rateType" required>
                            <option value="flat-rate">Use flat rate</option>
                            <option value="carrier-rate">Use carrier calculated rate</option>
                        </select>
                    </div>

                </div>

                {/* Shipping rate for flat rate */}
                <div className="w-full bg-white py-3 md:py-5 md:px-8 px-4 rounded-[4px] md:rounded-lg mt-2 md:mt-4">

                    {/* Rate name */}
                    <div className="">
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="rateName">Rate Name</label>
                        <input defaultValue={method?.rateName} className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]" type="text" name="rateName" id="rateName" placeholder="Enter rate name" required />
                        <p className="text-[#696969] font-normal text-sm leading-[140%] mt-1">{`Customers will see it during checkout.`}</p>
                    </div>

                    {/* Delivery description */}
                    <div className="mt-3">
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="deliveryDescription">Short Description <span className="text-[#696969] opacity-70">(optional)</span></label>
                        <input defaultValue={method?.deliveryDescription} className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]" type="text" name="deliveryDescription" id="deliveryDescription" placeholder="2-5 Working days" />
                    </div>

                    {/* Price */}
                    <div className="mt-3 relative">
                        <span className="absolute left-0 top-[30px] py-4 px-3 font-medium text-sm bg-gray-200 rounded-tl-md rounded-bl-md min-w-14 text-center">{currentStore?.storeCurrency}</span>
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="price">Price</label>
                        <input defaultValue={parseFloat(method?.price)} step="any" onChange={(e) => e.target.value > 0 ? setPriceTyped(true) : setPriceTyped(false)} className="w-full outline-none  px-16 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]" type="number" min={0} name="price" id="price" placeholder={`0.00`} />
                        {!priceTyped && <span className="text-sm text-gray-600 absolute right-5 top-[46px]">FREE</span>}
                    </div>


                    {/* Action buttons */}
                    <div className="w-full mt-5 flex justify-end gap-6">
                        <button onClick={handleDelete} type="button" className="py-3 px-5  bg-red-500  text-base font-medium  rounded-[4px] text-white  flex items-center justify-center gap-2  " >Delete profile</button>
                        <button className="py-3 px-5  focus:bg-[#232327] disabled:bg-[#232327] bg-[#232327]  hover:bg-black text-base font-medium  rounded-[4px] text-white  flex items-center justify-center gap-2  " type="submit">Update profile</button>
                    </div>


                </div>

















            </div>

        </form>



        {/* Bottom Bar */}
        <div className="md:hidden">
            <BottomBar />
        </div>

    </main>
}

export default EditShippingMethod