import { Link, useNavigate } from "react-router-dom"
import { IoIosArrowForward, IoIosArrowRoundForward } from "react-icons/io";
import logo from '../../assets/images/ecomer.png'
import { useState } from "react";


const SideBar = ({ content }) => {
    const navigate = useNavigate();
    //States
    const [isdropDown1Open, setIsDropdown1Open] = useState(true);
    const [isdropDown2Open, setIsDropdown2Open] = useState(true);


    return <main className="bg-white">
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content max-w-7xl mx-auto p-5">
                {/* Page content here */}
                {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label> */}
                {/* Main content */}
                {content}


            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu  text-base-content min-h-full w-80 p-4">
                    <div>
                        {/* Logo and Title */}

                        <div onClick={() => navigate("/")} className="hidden md:flex cursor-pointer items-center gap-2 border-b pb-3">
                            <img className="w-8 h-8" src={logo} alt="eComer logo" />
                            <p className="text-[#232327] text-[22px] leading-[170%] font-semibold">eComer</p>
                        </div>

                        {/* Sidebar links */}
                        <div className="mt-5 w-full">

                            {/* Introduction */}
                            <Link to="/docs" className="text-lg flex items-center justify-between font-medium text-[#232327]  leading-[150%] bg-gray-100 transition-colors duration-300 hover:bg-gray-200 w-full py-2 px-3 rounded">Introduction <span className="text-2xl pr-1"><IoIosArrowRoundForward /></span></Link>

                            {/* Setup */}
                            <div onClick={() => setIsDropdown1Open(!isdropDown1Open)} className="mt-3 bg-gray-100 rounded">
                                <Link to="/docs/setup" className="text-lg flex items-center justify-between font-medium text-[#232327]  leading-[150%]  transition-colors duration-300 hover:bg-gray-200 w-full py-2 px-3 rounded">Setup <span className="text-lg pr-1"><IoIosArrowForward className={`transition-transform duration-300 ease-in-out ${isdropDown1Open ? "rotate-90" : "rotate-0"}`} /></span></Link>

                                {/* Additional links */}
                                <ul onClick={(e) => e.stopPropagation()} className={`flex overflow-hidden bg-white flex-col ${isdropDown1Open ? "h-fit" : "h-0"}`}>
                                    <a href="/docs/setup#login" className="mt-2 px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Login </a>
                                    <a href="/docs/setup#create-store" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Create your first store </a>
                                    <a href="/docs/setup#initial-setup" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Initial setup options </a>
                                    <a href="/docs/setup#store-id" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Store ID </a>
                                    <a href="/docs/setup#payment-methods" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Configure payment methods</a>
                                </ul>
                            </div>

                            {/* Integration */}
                            <div onClick={() => setIsDropdown2Open(!isdropDown2Open)} className="mt-3 bg-gray-100 rounded">
                                <Link to="/docs/integration" className="text-lg flex items-center justify-between font-medium text-[#232327]  leading-[150%]  transition-colors duration-300 hover:bg-gray-200 w-full py-2 px-3 rounded">Integration guide<span className="text-lg pr-1"><IoIosArrowForward className={`transition-transform duration-300 ease-in-out ${isdropDown2Open ? "rotate-90" : "rotate-0"}`} /></span></Link>

                                {/* Additional links */}
                                <ul onClick={(e) => e.stopPropagation()} className={`flex overflow-hidden bg-white flex-col ${isdropDown2Open ? "h-fit" : "h-0"}`}>
                                    <a href="/docs/integration#cart-preview" className="mt-2 px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Cart preview</a>
                                    <a href="/docs/integration#cart-summary-preview" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Cart summary preview</a>
                                    <a href="/docs/integration#order-tracker" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Order tracker</a>
                                    <a href="/docs/integration#store-id-injector" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Store ID injector</a>
                                    <a href="/docs/integration#product-cms" className=" px-6  text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Product CMS</a>
                                    <a href="/docs/integration#product-data" className=" px-6 flex justify-between items-center  font-medium text-[#232327] text-base  py-2 hover:bg-gray-200 transition-colors duration-300">Collecting product data <span className="text-base rotate-90 pr-1"><IoIosArrowForward /></span></a>
                                </ul>
                            </div>




                        </div>
















                    </div>
                </ul>
            </div>
        </div>
    </main>
}

export default SideBar