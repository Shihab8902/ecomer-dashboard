import { NavLink, useNavigate } from "react-router-dom"
import Store from "./Store"



const TopBar = ({ title }) => {

    const navigate = useNavigate();


    return (
        <div className="bg-white py-4 md:py-6 fixed top-0 w-full z-50">
            <div className=" max-w-7xl mx-auto px-4 md:px-5 flex justify-between items-center  ">
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2">
                        <img className="w-8 h-8" src="ecomer.png" alt="eComer logo" />
                        <p className="text-[#232327] text-[22px] leading-[170%] font-semibold">eComer</p>
                    </div>
                    <div className="w-[1px] hidden md:block h-[22px] bg-[#00000033]"></div>
                    <h3 className="text-[#232327] text-lg md:text-base font-semibold leading-[120%]">{title}</h3>
                </div>

                {
                    <nav className="md:flex gap-5 hidden ">
                        <span onClick={() => navigate("/", { state: { renderDocs: true } })}> <NavLink className="font-medium text-base text-[#696969] leading-[160%]" to="/">Home</NavLink></span>
                        <NavLink className="font-medium text-base text-[#696969] leading-[160%]" to="/orders">Orders</NavLink>
                        <NavLink className="font-medium text-base text-[#696969] leading-[160%]" to="/store/manage">Settings</NavLink>
                        <NavLink className="font-medium text-base text-[#696969] leading-[160%]" to="/payment">Payment</NavLink>
                    </nav>
                }
                <Store />
            </div>
        </div>
    )
}

export default TopBar