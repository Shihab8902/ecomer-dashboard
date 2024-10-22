import { Link, useNavigate } from "react-router-dom"
import { PiCaretRightBold } from "react-icons/pi";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaRegCheckCircle, FaRegEdit } from "react-icons/fa";
import Store from "../components/Store";
import TopBar from "../components/TopBar";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useStoreInfo from "../hooks/useStoreInfo";
import Swal from "sweetalert2";
import { IoIosMail } from "react-icons/io";





const PaymentMethods = () => {

    const navigate = useNavigate();

    const [isCodOpen, setIsCodOpen] = useState(false);
    const [isStripeOpen, setIsStripeOpen] = useState(false);
    const [isYocoOpen, setIsYocoOpen] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [yocoPasswordVisible, setYocoPasswordVisible] = useState(false);
    const [stripeSecret, setStripeSecret] = useState('');
    const [yocoSecret, setYocoSecret] = useState('');
    const [isStripeSecretFieldVisible, setIsStripeSecretFieldVisible] = useState(false);
    const [isYocoSecretFieldVisible, setIsYocoSecretFieldVisible] = useState(false);


    const axiosPublic = useAxiosPublic();

    const { currentStore: store, refetchStore } = useStoreInfo();


    //Success message on payment method deactivation
    const successMessage = () => {
        return Swal.fire({
            text: "The payment method has been successfully deactivated.",
            timer: 1500,
            showConfirmButton: false,
            icon: "success"
        });

    };

    //Success message on payment method deactivation
    const successActivationMethod = () => {
        return Swal.fire({
            text: "The payment method has been successfully activated.",
            timer: 1500,
            showConfirmButton: false,
            icon: "success"
        });

    }


    //Error message on payment method deactivation
    const errorMessage = (message) => {
        return Swal.fire({
            title: "Error!",
            text: message,
            icon: "error"
        });
    }


    //Handle payment method deactivation
    const handlePaymentMethodDeactivation = (method) => {
        switch (method) {
            case "cod": {

                Swal.fire({
                    title: "Deactivate?",
                    text: "Are you sure you want to deactivate the payment method? Related services will stop functioning.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm"
                }).then((result) => {
                    if (result.isConfirmed) {
                        axiosPublic.put(`/payment/deactivate?id=${store?._id}&method=${method}`)
                            .then(result => {
                                if (result.data === "success") {
                                    successMessage();
                                    setIsCodOpen(false);
                                    refetchStore();
                                    return;
                                }

                            })
                            .catch(error => {
                                errorMessage(error.message);
                            })
                    }
                })

            }
                break;

            case "stripe": {
                Swal.fire({
                    title: "Deactivate?",
                    text: "Are you sure you want to deactivate the payment method? Related services will stop functioning.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm"
                }).then((result) => {
                    if (result.isConfirmed) {
                        axiosPublic.put(`/payment/deactivate?id=${store?._id}&method=${method}`)
                            .then(result => {
                                if (result.data === "success") {
                                    successMessage();
                                    refetchStore();
                                    setIsStripeOpen(false);
                                    return;
                                }

                            })
                            .catch(error => {
                                errorMessage(error.message);
                            })
                    }
                })

            }

                break;

            case "yoco": {

                Swal.fire({
                    title: "Deactivate?",
                    text: "Are you sure you want to deactivate the payment method? Related services will stop functioning.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm"
                }).then((result) => {
                    if (result.isConfirmed) {
                        axiosPublic.put(`/payment/deactivate?id=${store?._id}&method=${method}`)
                            .then(result => {
                                if (result.data === "success") {
                                    successMessage();
                                    refetchStore();
                                    setIsYocoOpen(false);
                                    return;
                                }

                            })
                            .catch(error => {
                                errorMessage(error.message);
                            })
                    }
                })

            }

                break;
            default: Swal.fire({
                title: "Error!",
                text: "Invalid operation!",
                icon: "error"
            })
        }
    }



    //Handle payment method activation
    const handlePaymentMethodActivation = (method) => {
        switch (method) {
            case "cod": {
                axiosPublic.put(`/payment/activate?id=${store?._id}&method=${method}`)
                    .then(result => {
                        if (result.data === "success") {
                            successActivationMethod();
                            refetchStore();
                            setIsCodOpen(false);
                            return;
                        }

                    })
                    .catch(error => {
                        errorMessage(error.message);
                    })

            }
                break;

            case "stripe": {
                if (stripeSecret) {
                    axiosPublic.put(`/payment/activate?id=${store?._id}&method=${method}`, { stripeSecret })
                        .then(result => {
                            if (result.data === "success") {
                                successActivationMethod();
                                refetchStore();
                                setIsStripeOpen(false);
                                setIsStripeSecretFieldVisible(false);
                                setStripeSecret('');
                                return;
                            }

                        })
                        .catch(error => {
                            console.log(error.message);
                        })
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Invalid Stripe Secret!",
                        icon: "error"
                    })

                }
            }

                break;

            case "yoco": {
                if (yocoSecret) {
                    axiosPublic.put(`/payment/activate?id=${store?._id}&method=${method}`, { yocoSecret })
                        .then(result => {
                            if (result.data === "success") {
                                successActivationMethod();
                                refetchStore();
                                setIsYocoOpen(false);
                                setIsYocoSecretFieldVisible(false);
                                setYocoSecret('');
                                return;
                            }

                        })
                        .catch(error => {
                            console.log(error.message);
                        })
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Invalid YOCO Secret!",
                        icon: "error"
                    })
                }
            }


                break;
            default: Swal.fire({
                title: "Error!",
                text: "Invalid Operation!",
                icon: "error"
            })

        }
    }


    //Format secret
    const formatSecret = (secret) => {
        if (!secret) return '';
        const length = secret.length;
        if (length > 4) {
            const lastFour = secret.slice(-4);
            const maskedPart = '*'.repeat(length - 4);
            return maskedPart + lastFour;
        }
        return secret;
    };







    return <main className="max-w-7xl mx-auto px-5">
        {/* Top bar */}
        <TopBar title="Payment Methods" />

        {/* Contents */}
        <div className="my-5 max-w-[400px] md:min-w-[400px] mx-auto border p-8 bg-[#FDFDFF] border-[#EBEBEE]  mt-20">

            {/* Cash on delivery */}
            <div >
                <div className=' border-y border-[#D3D3D4] border-collapse cursor-pointer'>
                    <div onClick={() => setIsCodOpen(!isCodOpen)} className={`flex items-center justify-between  mt-2  h-10 px-3 ${isCodOpen && "border-b"} border-[#D3D3D4]`}>
                        <div className="flex items-center gap-2">
                            <PiCaretRightBold className={`text-sm ${isCodOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                            <img className='w-10 select-none' src="cod.svg" alt="Cash on Delivery" />
                        </div>
                        {
                            store?.allowCod ? <span className="flex items-center gap-1 text-sm text-[#1FAC64]"><FaRegCheckCircle /> <span className="text-xs font-semibold ">Active</span></span>
                                : <button onClick={(e) => {
                                    e.stopPropagation();
                                    handlePaymentMethodActivation("cod");
                                }} className="  px-3 py-1 rounded text-sm bg-gray-200">Turn on</button>
                        }
                    </div>

                    <div className={`w-full overflow-hidden  ${isCodOpen ? "h-fit max-w-fit" : "h-0"} `}>
                        <div className="p-3">
                            <h4 className="uppercase text-xs font-semibold">About this payment method</h4>
                            <p className="mt-2 text-xs  leading-4">Cash on Delivery enables us to collect payment from customers at the time of delivery, ensuring a secure transaction without upfront online payments.</p>
                            {
                                store?.allowCod && <div className="w-full flex justify-end mt-5">
                                    <button onClick={() => handlePaymentMethodDeactivation("cod")} type="button" className=" rounded text-sm px-3 py-1 text-white cursor-pointer bg-[#E93725] hover:bg-[#E93725]">Turn off</button>
                                </div>
                            }
                        </div>
                    </div>


                </div>

            </div>


            {/* Stripe */}
            <div className="mt-5">
                <div className=' border-y border-[#D3D3D4] border-collapse cursor-pointer'>
                    <div onClick={() => setIsStripeOpen(!isStripeOpen)} className={`flex items-center justify-between  mt-2  h-10 px-3 ${isStripeOpen && "border-b"} border-[#D3D3D4]`}>
                        <div className="flex items-center gap-2">
                            <PiCaretRightBold className={`text-sm ${isStripeOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                            <img className='w-10 select-none' src="stripe.png" alt="Stripe" />
                        </div>
                        {
                            store?.stripeSecret ? <span className="flex items-center gap-1 text-sm text-[#1FAC64]"><FaRegCheckCircle /> <span className="text-xs font-semibold ">Active</span></span>
                                : <button className="px-3 py-1 rounded text-sm bg-gray-200">Turn on</button>
                        }
                    </div>

                    <div className={`w-full overflow-hidden  ${isStripeOpen ? "h-fit max-w-fit" : "h-0"} `}>
                        <div className="p-3">
                            <h4 className="uppercase text-xs font-semibold">About this payment method</h4>
                            <p className="mt-2 text-xs  leading-4">Stripe allows us to accept secure online payments, offering customers a seamless checkout experience with support for various payment methods.</p>

                            {/* Render Editable Stripe secret */}
                            {
                                store?.stripeSecret && <>
                                    {/* Stripe Secret */}
                                    <div className="mt-3 bg-white">
                                        <label className="block text-sm mb-1  " htmlFor="storeName">Stripe Secret Key</label>
                                        <div className="w-full p-3 border flex justify-between  border-[#D3D3D4] rounded">
                                            <p className='w-full overflow-x-auto break-words leading-tight text-xs pr-2'>{formatSecret(store?.stripeSecret)}</p> <span title='Update Stripe Secret' onClick={() => setIsStripeSecretFieldVisible(!isStripeSecretFieldVisible)} className='cursor-pointer'><FaRegEdit className='text-base' /></span>
                                        </div>
                                    </div>

                                    {/* Stripe Editable Secret field */}
                                    {
                                        isStripeSecretFieldVisible && <>
                                            <div className="relative mt-3">
                                                <label className="block text-sm mb-1  " htmlFor="stripeSecret">New Stripe Secret Key</label>
                                                <input onChange={(e) => setStripeSecret(e.target.value)} value={stripeSecret} className="w-full px-3 py-[10px] text-sm rounded border border-[#D3D3D4] outline-gray-200" type={visiblePassword ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter stripe secret" required />
                                                <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-3 right-2 text-base text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                            </div>

                                            <button onClick={() => handlePaymentMethodActivation("stripe")} className=" w-full bg-[#232327] mt-2 px-3 py-2 rounded-md text-white hover:bg-black text-sm focus:bg-black">Save</button>
                                        </>

                                    }
                                </>
                            }


                            {
                                store?.stripeSecret && <div className="w-full flex justify-end mt-5">
                                    <button type="button" onClick={() => handlePaymentMethodDeactivation("stripe")} className=" rounded text-sm px-3 py-1 text-white cursor-pointer bg-[#E93725] hover:bg-[#E93725]">Turn off</button>
                                </div>
                            }
                        </div>

                        {/* Input Stripe Credentials */}
                        {
                            !store?.stripeSecret && <div className="mb-2">
                                {/* Render stripe secret field */}
                                <div className="relative  px-3 ">
                                    <label className="block text-sm mb-1" htmlFor="stripeSecret">Stripe Secret Key</label>
                                    <input onChange={(e) => setStripeSecret(e.target.value)} className="w-full px-3 py-[10px] text-sm rounded border border-[#D3D3D4] outline-gray-200" type={visiblePassword ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter stripe secret" />
                                    <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-3 right-6 text-base text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>
                                <p className=" mt-1 text-[#232327] px-3 pb-2  text-[10px]">For retrieving your Stripe Secret, visit the <Link className="font-bold hover:underline" to="https://docs.stripe.com/keys" target='_blank'>Stripe API documentation.</Link></p>

                                <div className="w-full flex px-5 justify-end">
                                    <button onClick={() => handlePaymentMethodActivation("stripe")} className=" px-3 py-1 rounded text-sm bg-gray-200">Save</button>
                                </div>
                            </div>
                        }

                    </div>


                </div>

            </div>


            {/* Yoco */}
            <div className="mt-5">
                <div className=' border-y border-[#D3D3D4] border-collapse cursor-pointer'>
                    <div onClick={() => setIsYocoOpen(!isYocoOpen)} className={`flex items-center justify-between  mt-2  h-10 px-3 ${isYocoOpen && "border-b"} border-[#D3D3D4]`}>
                        <div className="flex items-center gap-2">
                            <PiCaretRightBold className={`text-sm ${isYocoOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                            <img className='w-12 select-none' src="yoco.svg" alt="Yoco" />
                        </div>
                        {
                            store?.yocoSecret ? <span className="flex items-center gap-1 text-sm text-[#1FAC64]"><FaRegCheckCircle /> <span className="text-xs font-semibold ">Active</span></span>
                                : <button className=" px-3 py-1 rounded text-sm bg-gray-200">Turn on</button>
                        }
                    </div>

                    <div className={`w-full overflow-hidden  ${isYocoOpen ? "h-fit max-w-fit" : "h-0"} `}>
                        <div className="p-3">
                            <h4 className="uppercase text-xs font-semibold">About this payment method</h4>
                            <p className="mt-2 text-xs  leading-4">Yoco enables us to securely process card payments, offering a trusted and convenient payment solution specifically designed for customers in South Africa.</p>

                            {/* Render Editable YOCO secret */}
                            {
                                store?.yocoSecret && <>
                                    {/* Yoco Secret */}
                                    <div className="mt-3 bg-white">
                                        <label className="block text-xs mb-1 font-medium" htmlFor="storeName">YOCO Secret Key</label>
                                        <div className="w-full p-3 border flex justify-between  border-[#D3D3D4] rounded">
                                            <p className='w-full overflow-x-auto break-words text-xs pr-2'>{formatSecret(store?.yocoSecret)}</p> <span title='Update Yoco Secret' onClick={() => setIsYocoSecretFieldVisible(!isYocoSecretFieldVisible)} className='cursor-pointer'><FaRegEdit className='text-base' /></span>
                                        </div>
                                    </div>

                                    {/* YOCO Editable Secret field */}
                                    {
                                        isYocoSecretFieldVisible && <>
                                            <div className="relative mt-3">
                                                <label className="block text-xs mb-1 font-medium" htmlFor="stripeSecret">New YOCO Secret Key</label>
                                                <input onChange={(e) => setYocoSecret(e.target.value)} value={yocoSecret} className="w-full px-3 py-[10px] text-sm rounded border border-[#D3D3D4] outline-gray-200" type={yocoPasswordVisible ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter YOCO secret" required />
                                                <span onClick={() => setYocoPasswordVisible(!yocoPasswordVisible)} className="absolute bottom-3 right-2 text-base text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                            </div>

                                            <button onClick={() => handlePaymentMethodActivation("yoco")} className="w-full bg-[#232327] mt-2 px-3 py-2 rounded-md text-white hover:bg-black text-sm focus:bg-black">Save</button>
                                        </>

                                    }
                                </>
                            }


                            {
                                store?.yocoSecret && <div className="w-full flex justify-end mt-5">
                                    <button type="button" onClick={() => handlePaymentMethodDeactivation("yoco")} className=" rounded text-sm px-3 py-1 text-white cursor-pointer bg-[#E93725] hover:bg-[#E93725]">Turn off</button>
                                </div>
                            }
                        </div>


                        {/* Input Yoco Credentials */}
                        {
                            !store?.yocoSecret && <div className="mb-2">
                                {/* Render stripe secret field */}
                                <div className="relative  px-3 ">
                                    <label className="block text-xs mb-1 font-medium" htmlFor="stripeSecret">YOCO Secret Key</label>
                                    <input onChange={(e) => setYocoSecret(e.target.value)} className="w-full px-3 py-[10px] text-sm rounded border border-[#D3D3D4] outline-gray-200" type={yocoPasswordVisible ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter stripe secret" />
                                    <span onClick={() => setYocoPasswordVisible(!yocoPasswordVisible)} className="absolute bottom-3 right-6 text-base text-gray-400 cursor-pointer">{yocoPasswordVisible ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>
                                <p className=" mt-1 text-[#232327] px-3 pb-2  text-[9px]">For retrieving your Yoco Secret, visit the <Link className="font-bold hover:underline" to="https://developer.yoco.com/online/resources/integration-keys" target='_blank'>YOCO API documentation.</Link></p>

                                <div className="w-full flex px-5 justify-end">
                                    <button onClick={() => handlePaymentMethodActivation("yoco")} className=" px-3 py-1 rounded text-sm bg-gray-200">Save</button>
                                </div>
                            </div>
                        }
                    </div>





                </div>

            </div>


        </div>

        <p className="text-center font-medium mt-5 text-sm flex justify-center items-center gap-1"> <IoIosMail className="text-2xl" /> <Link to="/payments/request">Request Payment Method</Link></p>

    </main>
}

export default PaymentMethods