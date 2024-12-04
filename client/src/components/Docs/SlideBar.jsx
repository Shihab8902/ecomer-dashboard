import { Link, useNavigate } from "react-router-dom"
import { IoIosArrowForward, IoIosArrowRoundForward } from "react-icons/io";
import logo from '../../assets/images/ecomer.png'
import { FiMenu } from "react-icons/fi";



const SideBar = ({ content }) => {
    const navigate = useNavigate();



    return <main className="bg-white">
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content max-w-7xl mx-auto px-5 pb-5 lg:p-5">
                {/* Page content here */}
                <div className="flex lg:hidden justify-between items-center py-5 sticky top-0 bg-white z-10">
                    <div onClick={() => navigate("/")} className="flex items-center gap-1">
                        <img className="w-8 h-8" src={logo} alt="eComer logo" />
                        <p className="text-[#232327] text-[22px] leading-[170%] font-semibold">eComer</p>
                    </div>
                    <label htmlFor="my-drawer-2" className="text-3xl text-[#232327]">
                        <FiMenu />
                    </label>
                </div>
                {/* Main content */}
                {content}


            </div>
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu pt-0 text-base-content min-h-full bg-white w-80 p-4">
                    <div className="relative ">
                        {/* Logo and Title */}
                        <div onClick={() => navigate("/")} className="hidden sticky top-0 pt-4 z-20 w-full bg-white md:flex cursor-pointer items-center gap-2 border-b pb-3">
                            <img className="w-8 h-8" src={logo} alt="eComer logo" />
                            <p className="text-[#232327] text-[22px] leading-[170%] font-semibold">eComer</p>
                        </div>

                        {/* Sidebar links */}
                        <div className="mt-5  w-full">

                            {/* Introduction */}
                            <Link to="/docs" className="text-lg flex items-center justify-between font-medium text-[#232327]  leading-[150%] bg-gray-100 transition-colors duration-300 hover:bg-gray-200 w-full py-2 px-3 rounded">Introduction <span className="text-2xl pr-1"><IoIosArrowRoundForward /></span></Link>

                            {/* Setup */}
                            <div className="mt-3 bg-gray-100 rounded">
                                <Link to="/docs/setup" className="text-lg flex items-center justify-between font-medium text-[#232327]  leading-[150%]  transition-colors duration-300 hover:bg-gray-200 w-full py-2 px-3 rounded">Setup <span className="text-lg pr-1"><IoIosArrowForward className={`transition-transform duration-300 ease-in-out rotate-90`} /></span></Link>

                                {/* Additional links */}
                                <ul onClick={(e) => e.stopPropagation()} className={`flex overflow-hidden bg-white flex-col h-fit`}>
                                    <a href="/docs/setup#login" className="mt-2 px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Login </a>
                                    <a href="/docs/setup#create-store" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Create your first store </a>
                                    <a href="/docs/setup#initial-setup" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Initial setup options </a>
                                    <a href="/docs/setup#store-id" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Store ID </a>
                                    <a href="/docs/setup#payment-methods" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Configure payment methods</a>
                                </ul>
                            </div>

                            {/* Integration */}
                            <div className="mt-3 bg-gray-100 rounded">
                                <Link to="/docs/integration" className="text-lg flex items-center justify-between font-medium text-[#232327]  leading-[150%]  transition-colors duration-300 hover:bg-gray-200 w-full py-2 px-3 rounded">Integration guide<span className="text-lg pr-1"><IoIosArrowForward className={`transition-transform duration-300 ease-in-out rotate-90`} /></span></Link>

                                {/* Additional links */}
                                <ul onClick={(e) => e.stopPropagation()} className={`flex overflow-hidden bg-white flex-col h-fit`}>
                                    <a href="/docs/integration#cart-preview" className="mt-2 px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Cart preview</a>
                                    <a href="/docs/integration#cart-summary-preview" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Cart summary preview</a>
                                    <a href="/docs/integration#order-tracker" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Order tracker</a>
                                    <a href="/docs/integration#store-id-injector" className=" px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Store ID injector</a>
                                    <a href="/docs/integration#product-cms" className=" px-6  text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Product CMS</a>
                                    <a href="/docs/integration#product-data" className=" px-6 flex justify-between items-center  font-medium text-[#232327] text-base  py-2 hover:bg-gray-200 transition-colors duration-300">Collecting product data <span className="text-base rotate-90 pr-1"><IoIosArrowForward /></span></a>
                                    <a href="/docs/integration#product-name" className=" px-12  text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Product name</a>
                                    <a href="/docs/integration#product-id" className=" px-12  text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Product ID</a>
                                    <a href="/docs/integration#product-price" className=" px-12  text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Product price</a>
                                    <a href="/docs/integration#product-image" className=" px-12  text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Product image</a>
                                    <a href="/docs/integration#order-quantity" className=" px-12  text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Order quantity</a>
                                    <a href="/docs/integration#add-to-cart" className=" px-6  text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Add to cart button</a>
                                    <a href="/docs/integration#subtotal-display" className=" px-6 flex justify-between items-center  font-medium text-[#232327] text-base  py-2 hover:bg-gray-200 transition-colors duration-300">Additional UI elements <span className="text-base rotate-90 pr-1"><IoIosArrowForward /></span></a>
                                    <a href="/docs/integration#subtotal-display" className=" px-12  text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Display product subtotal</a>
                                    <a href="/docs/integration#cart-total" className=" px-12  text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Display total cart items</a>
                                    <a href="/docs/integration#hide-ui" className=" px-12  text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Hide UI elements</a>
                                </ul>
                            </div>

                            {/* Checkout */}
                            <div className="mt-3 bg-gray-100 rounded">
                                <Link to="/docs/checkout" className="text-lg flex items-center justify-between font-medium text-[#232327]  leading-[150%]  transition-colors duration-300 hover:bg-gray-200 w-full py-2 px-3 rounded">Handling checkout <span className="text-lg pr-1"><IoIosArrowForward className={`transition-transform duration-300 ease-in-out rotate-90`} /></span></Link>

                                {/* Additional links */}
                                <ul onClick={(e) => e.stopPropagation()} className={`flex overflow-hidden bg-white flex-col h-fit`}>
                                    <a href="/docs/checkout#checkout-cod" className="mt-2 px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Checkout without payments</a>
                                    <Link to="/docs/checkout/stripe" className="mt-2 px-6 text-base block py-2 hover:bg-gray-200 transition-colors duration-300">Checkout with Stripe</Link>
                                </ul>
                            </div>

                            {/* Help & Support */}
                            <Link to="/docs/support" className="text-lg flex mt-3 items-center justify-between font-medium text-[#232327]  leading-[150%] bg-gray-100 transition-colors duration-300 hover:bg-gray-200 w-full py-2 px-3 rounded">Help & Support <span className="text-2xl pr-1"><IoIosArrowRoundForward /></span></Link>


                        </div>

                    </div>
                </ul>
            </div>
        </div>
    </main>
}

export default SideBar