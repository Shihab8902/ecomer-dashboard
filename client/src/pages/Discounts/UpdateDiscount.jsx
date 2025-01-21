import { useState } from "react";
import TopBar from "../../components/TopBar"
import useStoreInfo from "../../hooks/useStoreInfo";
import BottomBar from "../../components/BottomBar";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const UpdateDiscount = () => {

    //Hooks
    const { currentStore } = useStoreInfo();
    const axiosPublic = useAxiosPublic();


    //States
    const [discountValueType, setDiscountValueType] = useState("percentage");
    const [expendMinAmountValue, setExpendedMinAmountValue] = useState("");
    const [hasMaxLimit, setHasMaxLimit] = useState(false);


    //Date format
    const getDefaultDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };


    //Handle discount code creation
    const handleFormSubmit = e => {
        e.preventDefault();

        const data = {
            storeId: currentStore?.storeId,
            discountType: e.target?.discountType?.value,
            discountCode: e.target?.discountCode?.value,
            discountValueType: e.target?.discountValueType?.value,
            discountValue: parseFloat(e.target?.discountValue?.value) || 0,
            minRequiredAmount: parseFloat(e.target?.minRequiredAmount?.value) || 0,
            maxUse: parseInt(e.target?.maxUse?.value) || 0,
            oncePerCustomer: e.target?.oncePerCustomer?.checked,
            activeAt: getDefaultDate(),
            endsAt: e.target?.endsAt?.value || null
        }

        axiosPublic.post("/discountCode", data)
            .then(res => {
                if (res.data.message) {
                    e.target.reset();
                    setDiscountValueType("percentage");
                    setExpendedMinAmountValue("");
                    setHasMaxLimit(false);

                    Swal.fire({
                        icon: "success",
                        text: "Discount code created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    text: err.response.data.message,
                    title: "Error!"
                })
            })

    }


    return <main>
        <TopBar title="Discounts" subRoute={true} subRouteTitle="New discount" />

        <form onSubmit={handleFormSubmit} className="max-w-7xl px-5 mx-auto">

            {/* Content boxes */}
            <div className="w-full max-w-[600px] mb-[80px] md:mb-0  mx-auto pt-[88px] md:pt-[128px] pb-5">

                {/* Discount code */}
                <div className="w-full bg-white py-3 md:py-5 px-4 md:px-8 rounded-[4px] md:rounded-lg">
                    <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="discountCode">Discount Code</label>
                    <input className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]" type="text" name="discountCode" id="discountCode" placeholder="Enter discount code" required />
                    <p className="text-[#696969] font-normal text-sm leading-[140%] mt-1">Customers must enter this code at checkout.</p>
                </div>

                {/* Discount type & amount */}
                <div className="w-full bg-white py-3 md:py-5 md:px-8 px-4 rounded-[4px] md:rounded-lg mt-2 md:mt-4">

                    <div >
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="discountType">Discount Type</label>
                        <select className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal " defaultValue="product" name="discountType" id="discountType" required>
                            <option value="product">Product discount</option>
                            <option value="shipping">Free shipping</option>
                        </select>
                    </div>

                    <div className="mt-3">
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="discountType">Discount Value</label>
                        <div className="flex items-center justify-between">
                            <select onChange={(e) => setDiscountValueType(e.target.value)} className="w-[70%] outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal " defaultValue="percentage" name="discountValueType" id="discountValueType" required>
                                <option value="percentage">Percentage</option>
                                <option value="fixedAmount">Fixed Amount</option>
                            </select>
                            <input className="w-[28%] outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]" type="number" name="discountValue" id="discountValue" min={0} max={discountValueType === "percentage" && 100} placeholder={discountValueType === "percentage" ? "%" : currentStore?.storeCurrency} required />
                        </div>
                    </div>

                </div>

                {/* Minimum purchase amount */}
                <div className="w-full bg-white py-3 md:py-5 px-4 md:px-8 rounded-[4px] md:rounded-lg mt-2 md:mt-4">
                    <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="minPurchase">Minimum purchase amount</label>

                    <label className="flex items-center gap-1" htmlFor="minRequiredAmount">
                        <input onClick={(e) => setExpendedMinAmountValue(e.target.value)} className="cursor-pointer w-4 h-4" defaultChecked type="radio" name="minRequiredAmount1" id="minRequiredAmount1" value="" />
                        <span className="text-[#696969] font-normal text-sm leading-[140%]">No minimum requirements</span>
                    </label>

                    <label className="flex items-center gap-1 mt-2" htmlFor="minRequiredAmount">
                        <input onClick={(e) => setExpendedMinAmountValue(e.target.value)} className="cursor-pointer w-4 h-4" type="radio" name="minRequiredAmount1" id="minRequiredAmount2" value="fixedAmount" />
                        <span className="text-[#696969] font-normal text-sm leading-[140%]">Minimum purchase amount <span>({currentStore?.storeCurrency})</span></span>
                    </label>
                    {expendMinAmountValue && <input className="w-[40%] ml-4 mt-2 outline-none px-2 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-sm font-normal placeholder:text-[#696969]" type="number" name="minRequiredAmount" id="minRequiredAmount" min={0} placeholder={`${currentStore?.storeCurrency} 00`} required />}

                </div>

                {/* Usage limit */}
                <div className="w-full bg-white py-3 md:py-5 md:px-8 px-4 rounded-[4px] md:rounded-lg mt-2 md:mt-4">
                    <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="maximumUses">Maximum uses</label>

                    <label onClick={() => setHasMaxLimit(!hasMaxLimit)} className="flex items-center gap-1" htmlFor="maxLimit">
                        <input className="cursor-pointer w-4 h-4" type="checkbox" name="maxLimit" id="maxLimit" />
                        <span className="text-[#696969] font-normal text-sm leading-[140%]">Limit number of times this discount can be used in total</span>
                    </label>

                    {hasMaxLimit && <input className="w-[40%] ml-4 mt-2 outline-none  px-2 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-sm font-normal placeholder:text-[#696969]" type="number" name="maxUse" id="maxUse" min={0} required />}

                    <label className="flex items-center gap-1 mt-2" htmlFor="oncePerCustomer">
                        <input className="cursor-pointer w-4 h-4" type="checkbox" name="oncePerCustomer" id="oncePerCustomer" />
                        <span className="text-[#696969] font-normal text-sm leading-[140%]">Limit to one use per customer</span>
                    </label>
                </div>

                {/*Ending date*/}
                <div className="w-full bg-white py-3 md:py-5 px-4 md:px-8 rounded-[4px] md:rounded-lg mt-2 md:mt-4">
                    <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="endsAt">Ending date <span className="text-[#696969] opacity-70">(optional)</span></label>
                    <input type="date" className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]" name="endsAt" id="endsAt" />
                </div>

                {/* Save button */}
                <div className="w-full mt-5 flex justify-end">
                    <button className="py-3 px-5  focus:bg-[#232327] disabled:bg-[#232327] bg-[#232327]  hover:bg-black text-base font-medium  rounded-[4px] text-white  flex items-center justify-center gap-2  " type="submit">Save discount</button>
                </div>


            </div>

        </form>

        {/* Bottom Bar */}
        <div className="md:hidden">
            <BottomBar />
        </div>

    </main>
}

export default UpdateDiscount