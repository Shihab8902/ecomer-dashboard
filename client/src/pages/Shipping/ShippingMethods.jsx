import { useNavigate } from "react-router-dom"
import TopBar from "../../components/TopBar"
import { IoMdAdd } from "react-icons/io";
import BottomBar from "../../components/BottomBar";
import useStoreInfo from "../../hooks/useStoreInfo";
import { RxCaretRight } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";

const ShippingMethods = () => {

    //Hooks
    const navigate = useNavigate();
    const { currentStore } = useStoreInfo();



    return <main>
        {/* Top bar */}
        <TopBar title="Shipping" />

        {/* Content */}
        <div className="max-w-7xl px-5 mx-auto min-h-screen">

            <div className="max-w-[860px] pt-5 mx-auto  mt-[72px] md:mt-0 md:pt-[128px] mb-[72px] md:mb-0">

                <div>

                    <div className="bg-white rounded-[4px] md:rounded-bl-lg md:h-[80vh] md:overflow-hidden py-4 md:pb-5 md:pt-0 md:px-8 px-3">
                        <div >

                            <div className="md:mt-6 flex justify-between items-center flex-wrap border-b pb-3">
                                <h3 className="text-[#232327] font-semibold text-base  md:text-xl leading-[140%]">Shipping Profiles</h3>
                                <button onClick={() => navigate("/shipping/new")} type="button" className="w-fit h-fit hidden md:block rounded-[4px] text-white text-sm font-medium px-3 py-2 leading-[18px] cursor-pointer bg-[#232327] hover:bg-[#000] focus:bg-[#232327]">+ Add new</button>
                                <button onClick={() => navigate("/shipping/new")} className="md:hidden text-xl"><IoMdAdd /></button>
                            </div>

                            <div className="w-full md: h-[65vh]  md:overflow-auto mt-4">
                                {
                                    currentStore?.shippingMethods?.map(method => {
                                        return <div onClick={() => navigate("/shipping/update", { state: method })} key={method?.id} className={`my-3 border-b pb-3 cursor-pointer`}>
                                            {/* Order number */}
                                            <div className="w-full flex items-center justify-between">
                                                <h4 className="text-[#232327] font-medium text-sm md:text-base leading-[160%]">{method?.profileName}</h4>
                                                <span className="text-[#23232780] text-xl"><RxCaretRight /></span>
                                            </div>

                                            {/* Details */}
                                            <div className="flex items-center flex-wrap gap-1">
                                                <p className="text-[#696969] inline text-xs md:text-sm font-normal leading-[160%]">{method?.rateName}</p>
                                                <GoDotFill className="text-[10px] text-[#696969] opacity-80" />
                                                <p className="text-[#696969] inline text-xs md:text-sm font-normal leading-[160%]">{method?.rateType === "flat-rate" ? "Flat Rate" : "Carrier Rate"}</p>

                                            </div>

                                            {/* Status */}
                                            <div className="flex w-full items-center justify-between mt-[2px]">
                                                <div>
                                                    <p className="text-[#696969] inline text-xs md:text-sm font-normal leading-[160%]">{method?.deliveryDescription}</p>
                                                </div>

                                                <p className="text-[#232327] font-medium text-sm md:text-base leading-[160%]">{currentStore?.storeCurrency} {method?.price}</p>
                                            </div>


                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>


        {/* Bottom bar */}
        <div className="md:hidden">
            <BottomBar />
        </div>

    </main>
}

export default ShippingMethods