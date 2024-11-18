import TopBar from "../components/TopBar"
import { MdContentCopy, MdOutlineCheckCircle } from "react-icons/md";
import useStoreInfo from "../hooks/useStoreInfo";
import { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import BottomBar from "../components/BottomBar";

const Documentation = () => {

    const { currentStore: store, refetchStore } = useStoreInfo();
    const [isStoreIdCopied, setIsStoreIdCopied] = useState(false);
    const [expendAcc1, setExpendAcc1] = useState(false);
    const [expendAcc2, setExpendAcc2] = useState(false);
    const [expendAcc3, setExpendAcc3] = useState(false);



    const axiosPublic = useAxiosPublic();

    //Handle Store Id copy
    const handleStoreIdCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(store?.storeId)
            .then(() => {
                setIsStoreIdCopied(true);
                Swal.fire({
                    text: "Copied to clipboard",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                })

            })
    }

    function formatText(text) {
        if (text) {
            const firstPart = text.slice(0, 9);
            const middle = "********";
            const lastPart = text.slice(-6);

            return `${firstPart}${middle}${lastPart}`;
        }
    }


    //Handle update for step fulfill
    const handleStepCompletion = (index) => {
        switch (index) {
            case 1: {
                axiosPublic.put(`/store/setup?storeId=${store?.storeId}`, { index: 1 })
                    .then((res) => {
                        if (res.data?.success) {
                            Swal.fire({
                                text: "Marked as Done",
                                icon: "success",
                                timer: 1500
                            })

                            refetchStore();
                            setExpendAcc1(false);

                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            text: error.message,
                            icon: "error",
                        })

                    });

                return;
            }

            case 2: {
                axiosPublic.put(`/store/setup?storeId=${store?.storeId}`, { index: 2 })
                    .then((res) => {
                        if (res.data?.success) {

                            Swal.fire({
                                text: "Marked as Done",
                                icon: "success",
                                timer: 1500
                            })
                            refetchStore();
                            setExpendAcc2(false);
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            text: error.message,
                            icon: "error",
                        })
                    });

                return;
            }


            case 3: {
                axiosPublic.put(`/store/setup?storeId=${store?.storeId}`, { index: 3 })
                    .then((res) => {
                        if (res.data?.success) {
                            Swal.fire({
                                text: "Marked as Done",
                                icon: "success",
                                timer: 1500
                            })
                            refetchStore();
                            setExpendAcc3(false);
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            text: error.message,
                            icon: "error",
                        })
                    });

                return;
            }

            default: {
                Swal.fire({
                    text: "Invalid operation!",
                    icon: "error",
                })
            }

        }

    }


    return <div className="min-h-screen w-full bg-[#F1F1F1]">
        <TopBar title="Setup guide" />

        {/* Content */}
        <div className={` pt-[88px] md:pt-[128px] px-5 max-w-[860px] mx-auto flex w-full flex-col gap-5 `}>

            {/* Accordions */}
            <div className="my-2">

                {/* Template remix */}
                <div onClick={() => setExpendAcc1(!expendAcc1)} className={`py-3 md:py-5 px-4 md:px-8 ${expendAcc1 ? "max-h-[800px]" : "max-h-[52px] md:max-h-[70px]"} transition-all duration-300 overflow-hidden rounded-[4px] md:rounded-lg cursor-pointer bg-[#FFFFFF]`}>
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-base md:text-xl text-[#232323] leading-[150%]">Step 1: Remix the starter template</h4>
                        <div className="flex items-center">
                            {
                                store?.setupSteps?.some(step => step.index === 1) && <span className="text-xl text-[#38B818]"><MdOutlineCheckCircle /></span>
                            }
                            <span className={`text-2xl text-[#23232780]`}><RxCaretDown className={`${expendAcc1 ? "rotate-180" : "rotate-0"} transition-transform duration-500`} /></span>
                        </div>
                    </div>

                    {/* Accordion content */}
                    <div className={` mt-2 md:mt-4 ${expendAcc1 ? "opacity-100" : "opacity-0"} transition-opacity  duration-300  opacity-0`}>
                        <div className="bg-[#F6F6F6] max-w-[505px] mx-auto w-full px-3 pt-3 rounded-[4px]">
                            <img src="remix.png" alt="Template preview" className="w-full h-[324px] md:h-[474px]" />
                        </div>

                        <Link to="https://framer.com/projects/new?duplicate=y7nKoZJCd7roMdEXiGxM" target="_blank">  <button className="w-full max-w-[505px] mx-auto mt-4 focus:bg-[#232327] disabled:bg-[#232327] bg-[#232327] p-3 hover:bg-black text-base font-medium rounded-md text-white flex items-center justify-center gap-2 ">Remix Template</button></Link>
                        {
                            !store?.setupSteps?.some(step => step.index === 1) && <div className="w-full flex justify-center">
                                <button onClick={() => handleStepCompletion(1)} className="w-full py-3 text-base font-semibold leading-[160%} max-w-[505px] mx-auto border border-[#9DE48B] mt-4 hover:bg-white text-[#38B818] rounded-[4px]">Mark as Done</button>
                            </div>
                        }
                    </div>
                </div>


                {/* Store Id copy */}
                <div onClick={() => setExpendAcc2(!expendAcc2)} className={` py-3 md:py-5 mt-2 md:mt-4 px-4 md:px-8 ${expendAcc2 ? "max-h-[800px]" : "max-h-[52px] md:max-h-[70px]"} transition-all duration-300 overflow-hidden rounded-[4px] md:rounded-lg cursor-pointer bg-[#FFFFFF]`}>
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-base md:text-xl text-[#232323] leading-[150%]">Step 2: Add store ID</h4>
                        <div className="flex items-center">
                            {
                                store?.setupSteps?.some(step => step.index === 2) && <span className="text-xl text-[#38B818]"><MdOutlineCheckCircle /></span>
                            }
                            <span className={`text-2xl text-[#23232780]`}><RxCaretDown className={`${expendAcc2 ? "rotate-180" : "rotate-0"} transition-transform duration-500`} /></span>
                        </div>
                    </div>

                    {/* Accordion content */}
                    <div className={` ${expendAcc2 ? "opacity-100" : "opacity-0"} mt-2 md:mt-4 transition-opacity duration-300 rounded-lg opacity-0`}>
                        <p className="text-sm md:text-base font-normal text-[#696969] leading-[160%]">First copy your store id below:</p>
                        <div className="p-3 bg-[#FFEFAF] flex items-center justify-between w-full rounded-[4px]">
                            <p className="text-sm text-[#232327] font-medium">{formatText(store?.storeId)}</p> <span onClick={handleStoreIdCopy} className="text-[22px] text-[#232327]" ><MdContentCopy /></span>
                        </div>
                        {/* Step list */}
                        <ul className="mt-4 list-decimal px-4" >
                            <li className="text-sm md:text-base leading-[160%] font-normal text-[#696969]">Begin by opening the starter template.</li>
                            <li className="text-sm md:text-base leading-[160%] font-normal text-[#696969]">Double-click on the footer component to access it.</li>
                            <li className="text-sm md:text-base leading-[160%] font-normal text-[#696969]">Within the footer, look for a code component named <span className="text-[#232327] font-medium">"Store ID Injector."</span></li>
                            <li className="text-sm md:text-base leading-[160%] font-normal text-[#696969]">Copy your store ID and paste it into the property control of the <span className="text-[#232327] font-medium">"Store ID Injector."</span></li>
                            <li className="text-sm md:text-base leading-[160%] font-normal text-[#696969]">If needed, this code component can be placed in any other component that is shared across multiple pages.</li>
                        </ul>

                        <div className=" w-full mt-3">
                            <img className="max-h-[143px] md:max-h-[330px] w-full aspect-square" src="storeId.jpg" alt="Store id placement instruction" />
                            {
                                !store?.setupSteps?.some(step => step.index === 2) && <div className="w-full flex justify-center">
                                    <button onClick={() => handleStepCompletion(2)} className="w-full py-3 text-base font-semibold leading-[160%} max-w-[505px] mx-auto border border-[#9DE48B] mt-4 hover:bg-white text-[#38B818] rounded-[4px]">Mark as Done</button>
                                </div>
                            }

                        </div>
                    </div>
                </div>



                {/* Setting up payment method */}
                <div onClick={() => setExpendAcc3(!expendAcc3)} className={`py-3 md:py-5 px-4 md:px-8 ${expendAcc3 ? "max-h-64" : "max-h-[52px] md:max-h-[70px]"} mt-4 transition-all duration-300 overflow-hidden  rounded-lg cursor-pointer bg-[#FFFFFF]`}>
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-base md:text-xl text-[#232323] leading-[150%]">Step 3: Set up payment methods</h4>
                        <div className="flex items-center">
                            {
                                store?.setupSteps?.some(step => step.index === 3) && <span className="text-xl text-[#38B818]"><MdOutlineCheckCircle /></span>
                            }
                            <span className={`text-2xl text-[#23232780]`}><RxCaretDown className={`${expendAcc3 ? "rotate-180" : "rotate-0"} transition-transform duration-500`} /></span>
                        </div>
                    </div>

                    {/* Accordion content */}
                    <div className={` mt-4 ${expendAcc3 ? "opacity-100" : "opacity-0"} transition-opacity  duration-300 rounded-lg opacity-0`}>
                        <p className="text-sm md:text-base  font-normal text-[#696969] leading-[160%]">Navigate to <Link to="/payment" className="text-[#232327] font-medium underline">Payment page</Link> to configure payment method.</p>
                        {
                            !store?.setupSteps?.some(step => step.index === 3) && <div className="w-full flex justify-center">
                                <button onClick={() => handleStepCompletion(3)} className="w-full py-3 text-base font-semibold leading-[160%} max-w-[505px] mx-auto border border-[#9DE48B] mt-4 hover:bg-white text-[#38B818] rounded-[4px]">Mark as Done</button>
                            </div>
                        }
                    </div>
                </div>

            </div>

        </div>
        <div className="md:hidden">
            <BottomBar />
        </div>

    </div>
}

export default Documentation