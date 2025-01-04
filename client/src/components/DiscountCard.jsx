import { RxCaretRight } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";
import useStoreInfo from "../hooks/useStoreInfo";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";




const DiscountCard = ({ discount }) => {

    const { currentStore } = useStoreInfo();

    const { discountCode, discountType, discountValueType, discountValue, usedCustomers, activeAt, endsAt, isActive: isCodeActive } = discount;

    //Format date
    const formatDate = (dateString) => {
        if (dateString === "unknown") {
            return "unknown";
        }

        const date = moment(dateString);
        return date.format('Do MMMM YYYY');
    };



    const isActive = () => {
        if (endsAt) {
            const now = moment();
            const end = moment(endsAt);
            return now.isBefore(end) && isCodeActive;
        }
        return isCodeActive;
    }


    return <Link to="/">

        <div className="my-3 border-b pb-3 cursor-pointer">
            {/* Order number */}
            <div className="w-full flex items-center justify-between">
                <h4 className="text-[#232327] font-medium text-sm md:text-base leading-[160%]">{discountCode}</h4>
                <span className="text-[#23232780] text-xl"><RxCaretRight /></span>
            </div>

            {/* Details */}
            <div className="flex items-center flex-wrap gap-1">
                <p className="text-[#696969] inline text-xs md:text-sm font-normal leading-[160%]">{discountType === "product" ? "Product discount" : "Free shipping"}</p>
                <GoDotFill className="text-[10px] text-[#696969] opacity-80" />
                <p className="text-[#696969] inline text-xs md:text-sm font-normal leading-[160%]">{`${discountValue}${discountValueType === "percentage" ? "%" : ` ${currentStore?.storeCurrency}`}`}</p>
                <GoDotFill className="text-[10px] text-[#696969] md:text-sm opacity-80" />
                <p className="text-[#696969] inline text-xs md:text-sm font-normal leading-[160%]">{usedCustomers?.length} Used</p>
            </div>

            {/* Timelines */}
            <div className="flex items-center justify-between flex-wrap gap-1 mt-1">
                <div className="flex items-center gap-1">
                    <FaRegClock className="text-xs md:text-sm text-[#696969] leading-[160%] mt-[2px]" />
                    <p className="text-[#696969] inline text-xs md:text-sm font-normal leading-[160%]">{formatDate(activeAt)}</p>
                    {
                        endsAt && <div className="flex items-center gap-1">
                            <span className="text-[#696969] inline text-xs md:text-sm font-normal leading-[160%]"> <IoIosArrowRoundForward /></span>
                            <p className="text-[#696969] inline text-xs md:text-sm font-normal leading-[160%]">{formatDate(endsAt)}</p>
                        </div>
                    }

                </div>

                {
                    isActive ? <button className="text-xs font-medium text-white bg-[#38B818] rounded px-2 py-1">Active</button> : <button className="text-xs font-medium text-[#232327] bg-[#E5E7EB] rounded px-2 py-1">Expired</button>
                }

            </div>

        </div>

    </Link>
}

export default DiscountCard