import { NavLink, useNavigate } from "react-router-dom"
import Store from "./Store"
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import logo from '../assets/images/ecomer.png';

const TopBar = ({ title, subRoute, subRouteTitle }) => {

    const navigate = useNavigate();


    return (
        <div className="bg-white py-4 md:py-6 fixed top-0 w-full z-50">
            <div className=" max-w-7xl mx-auto px-4 md:px-5 flex justify-between items-center  ">
                <div className="flex items-center gap-4 min-w-[300px]">
                    <div onClick={() => navigate("/")} className="hidden md:flex cursor-pointer items-center gap-2">
                        <img className="w-8 h-8" src={logo} alt="eComer logo" />
                        <p className="text-[#232327] text-[22px] leading-[170%] font-semibold">eComer</p>
                    </div>
                    <div className="w-[1px] hidden md:block h-[22px] bg-[#00000033]"></div>
                    <div className="flex items-center gap-[2px]">
                        {/* For Mobile */}
                        <div className="md:hidden flex items-center gap-2">
                            {subRoute && <span onClick={() => navigate(-1)} className="text-[#232327] text-2xl "><GoArrowLeft /></span>}
                            <h3 className={`${subRoute ? "md:text-[#23232780] text-[#232327]" : "text-[#232327]"}  text-lg md:text-base font-semibold leading-[120%]`}>{subRoute ? subRouteTitle : title}</h3>
                        </div>
                        <h3 onClick={() => subRoute && navigate(-1)} className={`${subRoute ? "md:text-[#23232780] cursor-pointer text-[#232327]" : "text-[#232327] cursor-default"} hidden md:block text-lg md:text-base font-semibold leading-[120%]`}>{title}</h3>
                        {
                            subRoute && <div className="hidden md:flex  items-center gap-[2px]">
                                <span className="text-[#23232780] text-2xl"><MdKeyboardArrowRight /></span>
                                <h4 className={`text-[#232327] text-lg md:text-base font-semibold leading-[120%]`}>{subRouteTitle}</h4>
                            </div>
                        }

                    </div>
                </div>

                <div className="flex items-center gap-8">

                    {
                        <nav className="md:flex gap-5 hidden ">
                            <span onClick={() => navigate("/", { state: { renderDocs: true } })}> <NavLink className="font-medium text-base text-[#232327] opacity-60 leading-[160%]" to="/">Home</NavLink></span>
                            <NavLink className="font-medium text-base text-[#232327] opacity-60 leading-[160%]" to="/orders">Orders</NavLink>
                            <NavLink className="font-medium text-base text-[#232327] opacity-60 leading-[160%]" to="/discounts">Discounts</NavLink>
                            <NavLink className="font-medium text-base text-[#232327] opacity-60 leading-[160%]" to="/store/manage">Settings</NavLink>
                            <NavLink className="font-medium text-base text-[#232327] opacity-60 leading-[160%]" to="/payment">Payment</NavLink>
                            <NavLink className="font-medium text-base text-[#232327] opacity-60 leading-[160%]" to="/docs">Docs</NavLink>

                        </nav>
                    }
                    <Store />
                </div>

            </div>
        </div>
    )
}

export default TopBar