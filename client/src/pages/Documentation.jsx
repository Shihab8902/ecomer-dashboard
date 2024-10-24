import { FaCopy, FaRegCircleCheck } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import useStoreInfo from "../hooks/useStoreInfo";
import Swal from "sweetalert2";

const Documentation = () => {

    const { currentStore: store } = useStoreInfo();
    const [isStoreIdCopied, setIsStoreIdCopied] = useState(false);

    //Handle Store Id copy
    const handleStoreIdCopy = () => {
        navigator.clipboard.writeText(store?.storeId)
            .then(() => {
                setIsStoreIdCopied(true);
                Swal.fire({
                    text: "Copied to clipboard",
                    showConfirmButton: false,
                    timer: 1500,
                    icon: "success"
                })
            })
    }


    return <div className="max-w-7xl mx-auto px-5">
        <TopBar title="Initial Setup" />

        {/* Content */}
        <div className="px-5 my-16 flex w-full flex-col gap-5 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 ">
                <p className="text-base"><span className="font-bold">Step 1:</span> Remix the starter template. </p>
                <span className="flex items-center gap-1 font-semibold text-[#1FAC64]"><FaRegCircleCheck />Complete</span>
            </div>

            <div className=" ">
                <div className="flex items-center gap-3">
                    <p className="text-base"><span className="font-bold">Step 2:</span> Copy your store Id from below </p>
                    {
                        isStoreIdCopied && <span className="flex items-center gap-1 font-semibold text-[#1FAC64]"><FaRegCircleCheck />Complete</span>
                    }
                </div>
                {/* Store id */}
                <div className="mt-3 pl-14">
                    <div className="w-fit rounded-md  p-3 mb-2 border text-xs flex gap-5 items-center border-gray-100 ">
                        {store?.storeId} <span onClick={handleStoreIdCopy} title='Copy Store ID' className='cursor-pointer'><FaCopy /></span>
                    </div>
                </div>
            </div>


            <div className="flex flex-col items-center gap-3 ">
                <p className="text-base"><span className="font-bold">Step 3:</span> Open the starter template and double click on the footer component. Here you will find  a code component name “Store Id Injector”, paste the store id on its property control. (This code component can also be placed on any other component that is shared across multiple pages.)</p>
                <img className="w-full" src="storeId.png" alt="" />
            </div>

            <div className="flex items-center gap-3 ">
                <p className="text-base"><span className="font-bold">Step 4:</span> Receiving Payments - To turn on or off all the available payment methods. navigate to the <Link className="underline" to="/payments">Payments</Link> tab.
                    Cash on Delivery payment method is active by default. You can also add other available methods to your store by following the on page instructions. </p>

            </div>


        </div>





    </div>
}

export default Documentation