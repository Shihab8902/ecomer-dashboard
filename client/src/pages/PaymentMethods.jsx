import { Link } from "react-router-dom"
import { PiCaretRightBold } from "react-icons/pi";
import { useState } from "react";
import useStoreInfo from "../hooks/useStoreInfo";
import { FaRegCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import { MdEmail, MdOutlineModeEditOutline } from "react-icons/md";
import Swal from "sweetalert2";


const PaymentMethods = () => {



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

    }

    //Success message on payment method deactivation
    const successActivationMethod = () => {
        return Swal.fire({
            text: "The payment method has been successfully activated.",
            timer: 1500,
            showConfirmButton: false,
            icon: "success"
        })

    }


    //Error message on payment method deactivation
    const errorMessage = (message) => {
        Swal.fire({
            title: "Error!",
            text: message,
            icon: "error"
        })

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
                    confirmButtonText: "Confirm"
                })
                    .then(res => {
                        if (res.isConfirmed) {
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
                    confirmButtonText: "Confirm"
                })
                    .then(res => {
                        if (res.isConfirmed) {
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
                    confirmButtonText: "Confirm"
                })
                    .then(res => {
                        if (res.isConfirmed) {
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
                text: "Invalid Operation",
                title: "Error!",
                variant: "error"
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
                        text: "Invalid Stripe secret",
                        variant: "error"
                    });
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
                        text: "Invalid YOCO secret",
                        variant: "error"
                    });

                }
            }


                break;

            default: Swal.fire({
                text: "Invalid Operation",
                title: "Error!",
                variant: "error"
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




    return <main >
        {/* Top bar */}
        <TopBar title="Payment Methods" />


        <div className="min-h-screen max-w-7xl mx-auto flex justify-center  px-5">
            <div className="pt-[88px] md:pt-[128px] max-w-[860px] mb-[100px] md:mb-0 mx-auto flex w-full flex-col gap-5">
                {/* Contents */}
                <div className=" w-full my-2">

                    {/* Cash on delivery */}
                    <div >
                        <div className='bg-white cursor-pointer md:py-[22px] p-4 rounded-[4px] md:px-8 md:rounded-lg'>
                            <div onClick={() => setIsCodOpen(!isCodOpen)} className={`flex items-center justify-between  `}>
                                <div className="flex items-center gap-2">
                                    <PiCaretRightBold className={`text-base md:text-xl text-[#23232780] ${isCodOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                                    <p className="text-[#232327] text-base md:text-xl font-medium">Cash on delivery</p>
                                </div>
                                {
                                    store?.allowCod ? <span className="flex items-center gap-1 text-sm text-[#38B819]"><FaRegCheckCircle /> <span className="text-xs font-medium ">Active</span></span>
                                        : <button onClick={(e) => {
                                            e.stopPropagation();
                                            handlePaymentMethodActivation("cod");
                                        }} className=" w-fit h-fit px-3 py-2 text-xs font-medium rounded-[4px] text-white leading-[18px] hover:bg-black bg-[#232327] focus:bg-[#232327]">Turn on</button>
                                }
                            </div>

                            <div className={`w-full overflow-hidden transition-all duration-300 ${isCodOpen ? "max-h-96" : "max-h-0"} `}>
                                <div >
                                    <p className="mt-2 md:mt-2 text-sm font-normal text-[#696969] leading-[20px]">Cash on Delivery enables us to collect payment from customers at the time of delivery, ensuring a secure transaction without upfront online payments.</p>
                                    {
                                        store?.allowCod && <div className="w-full flex justify-end mt-2 md:mt-3">
                                            <button onClick={() => handlePaymentMethodDeactivation("cod")} type="button" className="w-fit h-fit rounded-[4px] text-white text-sm font-medium px-3 py-2 leading-[18px] cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>
                                        </div>
                                    }
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* Stripe */}
                    <div className="mt-2 md:mt-4">
                        <div className=' bg-white cursor-pointer p-4 rounded-[4px] md:px-8 md:py-[19px] md:rounded-lg'>
                            <div onClick={() => {
                                setIsStripeOpen(!isStripeOpen);
                                setIsStripeSecretFieldVisible(false);
                            }} className={`flex items-center justify-between `}>
                                <div className="flex items-center gap-2">
                                    <PiCaretRightBold className={`text-base md:text-xl text-[#23232780] ${isStripeOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                                    <img className='w-[43px] h-[18px] md:w-[57px] md:h-[24px] object-fill select-none' src="stripe.png" alt="Stripe" />
                                </div>
                                {
                                    store?.stripeSecret ? <span className="flex items-center gap-1 text-sm text-[#38B819]"><FaRegCheckCircle /> <span className="text-xs font-medium ">Active</span></span>
                                        : <button className=" w-fit h-fit px-3 py-[6px] md:py-2 text-xs font-medium rounded-[4px] text-white leading-[18px] hover:bg-black bg-[#232327] focus:bg-[#232327]">Turn on</button>
                                }
                            </div>

                            <div className={`w-full overflow-hidden transition-all duration-300  ${isStripeOpen ? "max-h-[500px]" : "max-h-0"} `}>
                                <div >
                                    <p className="mt-2 md:mt-3 text-sm font-normal text-[#696969] leading-[20px]">Stripe allows to accept secure online payments, offering customers a seamless checkout experience with support for various payment methods.</p>

                                    {/* Render Editable Stripe secret */}
                                    {
                                        store?.stripeSecret && <>
                                            {/* Stripe Secret */}
                                            <div className="mt-2">

                                                <div className="w-full">
                                                    {
                                                        isStripeSecretFieldVisible ? <div className="w-full ">
                                                            {/* Render editable stripe secret field */}
                                                            <div >
                                                                <label className="block text-sm text-[#232327] leading-[160%] mb-1 font-medium" htmlFor="storeName">New Stripe secret key</label>
                                                                <div className="relative">
                                                                    <input onChange={(e) => setStripeSecret(e.target.value)} className="w-full text-base outline-none p-3 bg-[#F6F6F6] rounded-[4px] " type={visiblePassword ? " text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter new Stripe secret key" />
                                                                    <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-3 right-3  text-[#696969] cursor-pointer text-xl">{visiblePassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                                                                </div>
                                                                <div className="w-full flex gap-2 justify-end items-center mt-3">
                                                                    <button type="button" onClick={() => handlePaymentMethodDeactivation("stripe")} className="w-fit h-fit rounded-[4px] text-white text-sm font-medium px-3 py-2 leading-[18px] cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>
                                                                    <button onClick={() => handlePaymentMethodActivation("stripe")} className="w-fit h-fit rounded-[4px] text-[#232327] text-xs font-medium px-5 py-2 leading-[18px] cursor-pointer bg-[#E5E7EB] hover:bg-[#E5E7EB] focus:bg-[#E5E7EB]">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                            : <div className="w-full">
                                                                <label className="block text-sm text-[#232327] leading-[160%]  font-medium" htmlFor="storeName">Stripe secret key</label>
                                                                <div className="w-full flex items-start justify-between">
                                                                    <p className="w-[85%] text-sm text-[#696969] mt-2 leading-[140%] pr-10 break-words">{formatSecret(store?.stripeSecret)}</p>
                                                                    <span onClick={() => setIsStripeSecretFieldVisible(!isStripeSecretFieldVisible)} className="text-2xl text-[#232327] block cursor-pointer"><MdOutlineModeEditOutline /></span>
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                            </div>


                                        </>
                                    }


                                    {
                                        store?.stripeSecret && <div className={`w-full flex justify-end mt-3 ${isStripeSecretFieldVisible && "hidden"}`}>
                                            {!isStripeSecretFieldVisible && <button type="button" onClick={() => handlePaymentMethodDeactivation("stripe")} className="w-fit h-fit rounded-[4px] text-white text-sm font-medium px-3 py-2 leading-[18px] cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>}
                                        </div>
                                    }
                                </div>

                                {/* Input Stripe Credentials */}
                                {
                                    !store?.stripeSecret && <div className="mt-2">
                                        {/* Render stripe secret field */}
                                        <div className="relative">
                                            <label className="block text-sm text-[#232327] mb-1 leading-[160%]  font-medium" htmlFor="stripeSecret">Stripe secret key</label>
                                            <input onChange={(e) => setStripeSecret(e.target.value)} className="w-full  outline-none p-3 bg-[#F6F6F6] rounded-[4px] " type={visiblePassword ? " text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter stripe secret key" />
                                            <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-3 right-3  text-[#696969] cursor-pointer text-xl">{visiblePassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                                        </div>
                                        <p className="font-normal mt-[2px] leading-[140%] text-xs text-[#696969]">For retrieving your Stripe Secret, visit <Link className="font-medium text-[#232327] hover:underline" to="https://docs.stripe.com/keys" target='_blank'>Stripe API documentation.</Link></p>
                                        <div className="w-full flex  justify-end">
                                            <button onClick={() => handlePaymentMethodActivation("stripe")} className="w-fit mt-2 md:mt-3 h-fit rounded-[4px] text-[#232327] text-xs font-medium px-5 py-2 leading-[18px] cursor-pointer bg-[#E5E7EB] hover:bg-[#E5E7EB] focus:bg-[#E5E7EB]">Save</button>
                                        </div>
                                    </div>
                                }

                            </div>


                        </div>

                    </div>


                    {/* Yoco */}
                    <div className="mt-2 md:mt-4">
                        <div className='bg-white cursor-pointer p-4 rounded-[4px] md:px-8 md:py-[22px] md:rounded-lg'>
                            <div onClick={() => {
                                setIsYocoOpen(!isYocoOpen);
                                setIsYocoSecretFieldVisible(false);
                            }} className="flex items-center justify-between ">
                                <div className="flex items-center gap-2">
                                    <PiCaretRightBold className={`text-base md:text-xl text-[#23232780] ${isYocoOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                                    <img className='w-[53px] md:w-[67px] md:h-[23px] h-[18px] select-none' src="yoco.svg" alt="Yoco" />
                                </div>
                                {
                                    store?.yocoSecret ? <span className="flex items-center gap-1 text-sm text-[#38B819]"><FaRegCheckCircle /> <span className="text-xs font-medium ">Active</span></span>
                                        : <button className={`w-fit h-fit px-3 py-[6px] md:py-2 text-xs font-medium rounded-[4px] text-white leading-[18px] hover:bg-black bg-[#232327] focus:bg-[#232327]`}>Turn on</button>
                                }
                            </div>

                            <div className={`w-full overflow-hidden transition-all duration-300  ${isYocoOpen ? "max-h-[500px]" : "max-h-0"} `}>
                                <div >

                                    <p className="mt-2 text-sm font-normal text-[#696969] leading-[20px]">Yoco enables us to securely process card payments, offering a trusted and convenient payment solution specifically designed for customers in South Africa.</p>

                                    {/* Render Editable YOCO secret */}
                                    {
                                        store?.yocoSecret && <>
                                            {/* Yoco Secret */}
                                            <div className="mt-2">
                                                <div className="w-full">
                                                    {
                                                        isYocoSecretFieldVisible ? <div className="w-full">
                                                            {/* YOCO Editable Secret field */}
                                                            <div >
                                                                <label className="block text-sm text-[#232327] leading-[160%] mb-1 font-medium" htmlFor="yocoSecret">New YOCO secret key</label>
                                                                <div className="relative">
                                                                    <input onChange={(e) => setYocoSecret(e.target.value)} value={yocoSecret} className="w-full text-base outline-none p-3 bg-[#F6F6F6] rounded-[4px]" type={yocoPasswordVisible ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter YOCO secret" required />
                                                                    <span onClick={() => setYocoPasswordVisible(!yocoPasswordVisible)} className="absolute bottom-3 right-3  text-[#696969] cursor-pointer text-xl">{yocoPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                                                                </div>
                                                                <div className="w-full flex gap-2 justify-end items-center mt-3">
                                                                    <button type="button" onClick={() => handlePaymentMethodDeactivation("yoco")} className="w-fit h-fit rounded-[4px] text-white text-sm font-medium px-3 py-2 leading-[18px] cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>
                                                                    <button onClick={() => handlePaymentMethodActivation("yoco")} className="w-fit h-fit rounded-[4px] text-[#232327] text-xs font-medium px-5 py-2 leading-[18px] cursor-pointer bg-[#E5E7EB] hover:bg-[#E5E7EB] focus:bg-[#E5E7EB]">Save</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                            : <div className="w-full">
                                                                <label className="block text-sm text-[#232327] leading-[160%] mb-1 font-medium" htmlFor="YOCO Secret">YOCO secret key</label>
                                                                <div className="w-full flex items-start justify-between">
                                                                    <p className="w-[85%] text-sm text-[#696969] mt-2 leading-[140%] pr-10 break-words">{formatSecret(store?.yocoSecret)}</p>
                                                                    <span onClick={() => setIsYocoSecretFieldVisible(!isYocoSecretFieldVisible)} className="text-2xl text-[#232327] block cursor-pointer"><MdOutlineModeEditOutline /></span>
                                                                </div>
                                                            </div>
                                                    }
                                                </div>

                                            </div>
                                        </>
                                    }

                                    {
                                        store?.yocoSecret && <div className={`w-full flex justify-end mt-3 ${isYocoSecretFieldVisible && "hidden"}`}>
                                            {!isYocoSecretFieldVisible && <button type="button" onClick={() => handlePaymentMethodDeactivation("yoco")} className="w-fit h-fit rounded-[4px] text-white text-sm font-medium px-3 py-2 leading-[18px] cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>}
                                        </div>
                                    }
                                </div>


                                {/* Input Yoco Credentials */}
                                {
                                    !store?.yocoSecret && <div className="mt-2">
                                        {/* Render stripe secret field */}
                                        <div className="relative">
                                            <label className="block text-sm text-[#232327] leading-[160%] mb-1 font-medium" htmlFor="stripeSecret">YOCO secret key</label>
                                            <input onChange={(e) => setYocoSecret(e.target.value)} className="w-full  outline-none p-3 bg-[#F6F6F6] rounded-[4px]" type={yocoPasswordVisible ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter stripe secret" />
                                            <span onClick={() => setYocoPasswordVisible(!yocoPasswordVisible)} className="absolute bottom-3 right-3  text-[#696969] cursor-pointer text-xl">{yocoPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                                        </div>
                                        <p className=" font-normal mt-[2px] leading-[140%] text-xs text-[#696969]">For retrieving your Yoco Secret, visit the <Link className="font-bold hover:underline" to="https://developer.yoco.com/online/resources/integration-keys" target='_blank'>YOCO API documentation.</Link></p>

                                        <div className="w-full flex justify-end">
                                            <button onClick={() => handlePaymentMethodActivation("yoco")} className=" w-fit mt-2 md:mt-3 h-fit rounded-[4px] text-[#232327] text-xs font-medium px-5 py-2 leading-[18px] cursor-pointer bg-[#E5E7EB] hover:bg-[#E5E7EB] focus:bg-[#E5E7EB]">Save</button>
                                        </div>
                                    </div>
                                }
                            </div>


                        </div>

                    </div>


                </div>

                <p className="text-center font-normal mt-1 md:mt-3 text-base flex justify-center text-[#696969] items-center gap-1"> <MdEmail className="text-2xl" /> <Link to="/payment/request">Request payment method</Link></p>
            </div>
        </div>




        {/* Bottom bar */}
        <div className="md:hidden">
            <BottomBar />
        </div>
    </main>
}

export default PaymentMethods