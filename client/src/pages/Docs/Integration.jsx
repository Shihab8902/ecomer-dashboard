/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import cartPreview from "../../assets/images/docs/cartPreview.png"
import cartSummaryPreview from '../../assets/images/docs/cartSummaryPreview.png';
import orderTracker from '../../assets/images/docs/orderTracker.png';
import storeIdInjector from '../../assets/images/docs/storeIdInjector.png';
import cmsExample from '../../assets/images/docs/CMS.png';
import { FaRegCopy } from "react-icons/fa"
import toast, { Toaster } from 'react-hot-toast';
import { IoCheckmarkOutline } from "react-icons/io5";
import SideBar from "../../components/Docs/SlideBar";
import { useLocation } from "react-router-dom";
import DataCollection from "../../components/Docs/DataCollection";

const Integration = () => {
    const [isComponentCopied, setIsComponentCopied] = useState({});

    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView();
            }
        }
    }, [location]);

    //Handle component copying
    const handleComponentCopy = (url, index) => {
        if (!url) {
            return;
        }
        window.navigator.clipboard.writeText(url)
            .then(() => {
                setIsComponentCopied((prevState) => ({
                    ...prevState,
                    [index]: !prevState[index],
                }));
                toast.success("Component Copied. Paste in Framer.", { duration: 3000, position: "top-center" })
                setTimeout(() => {
                    setIsComponentCopied(false);
                }, 3000)
            })
    }


    const content = <article id="integration">
        <h1 className="text-[#232327] font-semibold text-[32px]">Integration with existing project</h1>
        <p className="text-[#696969] font-normal leading-[140%] text-base mt-3">This section guides you through integrating eComer with your existing <strong>Framer</strong> project. The integration process involves using a combination of custom code components and code overrides to seamlessly connect your project with eComer’s functionality. </p>

        <iframe className="my-5 rounded-lg " width="90%" height="490" src="https://www.youtube.com/embed/_fuimO6ErKI?si=TQbUdoGaziGbHkly" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        {/* Cart preview */}
        <div id="cart-preview" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Cart Preview</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">The Cart Preview component provides an interactive summary of the items in the shopping cart. Users can increase or decrease the quantity of products directly within the cart or remove items as needed. The component updates in real time with the user interaction, ensuring a seamless shopping experience. <br /> Additionally, it offers customizable design options through provided property controls, allowing you to style the cart to match your project’s aesthetics.</p>
            <div className="w-[90%] relative bg-gray-100 border-[#EAEAEA] border rounded-lg p-10 h-[490px] my-3">
                <img className=" mt-8 rounded-lg w-full  h-full" src={cartPreview} alt="Cart preview component example" />
                <button onClick={() => handleComponentCopy("https://framer.com/m/Cart-Preview-lZDY.js", 1)} className="absolute right-3 top-3 bg-[#232327] text-white font-semibold leading-[150%] text-sm py-3 px-8 rounded flex items-center gap-3">Copy component <span>{isComponentCopied[1] ? <IoCheckmarkOutline /> : <FaRegCopy />}</span></button>
            </div>
        </div>

        {/* Cart Summary preview */}
        <div id="cart-summary-preview" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Cart Summary Preview</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">The Order Tracker component allows users to check their orders and track the status of each order, from processing to delivery. This component enhances the shopping experience by keeping users informed. It is also fully customizable using the provided property controls, allowing you to fully modify its design to match your project aesthetics.</p>
            <div className="w-[90%] relative bg-gray-100 border-[#EAEAEA] border rounded-lg p-10 h-[490px] my-3">
                <img className=" mt-8 rounded-lg w-full  h-full" src={cartSummaryPreview} alt="Cart preview component example" />
                <button onClick={() => handleComponentCopy("https://framer.com/m/Cart-Summary-Preview-T5su.js", 2)} className="absolute right-3 top-3 bg-[#232327] text-white font-semibold leading-[150%] text-sm py-3 px-8 rounded flex items-center gap-3">Copy component <span>{isComponentCopied[2] ? <IoCheckmarkOutline /> : <FaRegCopy />}</span></button>
            </div>
        </div>

        {/* Order Tracker*/}
        <div id="order-tracker" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Order Tracker</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">The Order Tracker component allows users to check their orders and track the status of each order, from processing to delivery. This component enhances the shopping experience by keeping users informed. It is also fully customizable using the provided property controls, allowing you to fully modify its design to match your project aesthetics.</p>
            <h4 className="text-xl font-semibold text-[#232327] mt-3">How to connect the Order Tracker component with your store?</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-0">To connect the Order Tracker component, provide your Store ID through the component's property control.</p>
            <div className="w-[90%] relative bg-gray-100 border-[#EAEAEA] border rounded-lg p-10 h-[490px] my-3">
                <img className=" mt-8 rounded-lg w-full  h-full" src={orderTracker} alt="Order tracker component example" />
                <button onClick={() => handleComponentCopy("https://framer.com/m/Order-Tracker-2P9V.js", 3)} className="absolute right-3 top-3 bg-[#232327] text-white font-semibold leading-[150%] text-sm py-3 px-8 rounded flex items-center gap-3">Copy component <span>{isComponentCopied[3] ? <IoCheckmarkOutline /> : <FaRegCopy />}</span></button>
            </div>
        </div>

        {/* Store id injector */}
        <div id="store-id-injector" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Store ID injector</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">The Store ID Injector is a utility component designed to simplify the process of managing your Store ID across your project. It automatically injects your Store ID into the browser's local storage, ensuring that all code overrides requiring the Store ID can access it without needing manual input for each override.</p>
            <p className="text-[#232327] font-semibold leading-[140%] text-base mt-2">To use the component, provide your Store ID through its property control and place it within a shared component in your project, such as a navbar or footer, which is present across multiple pages.</p>
            <div className="w-[90%] relative bg-gray-100 border-[#EAEAEA] border rounded-lg p-10 h-[490px] my-3">
                <img className=" mt-8 rounded-lg w-full  h-full" src={storeIdInjector} alt="Store id injector component example" />
                <button onClick={() => handleComponentCopy("https://framer.com/m/Store-Id-Injector-CSq4.js", 4)} className="absolute right-3 top-3 bg-[#232327] text-white font-semibold leading-[150%] text-sm py-3 px-8 rounded flex items-center gap-3">Copy component <span>{isComponentCopied[4] ? <IoCheckmarkOutline /> : <FaRegCopy />}</span></button>
            </div>
            <p className="text-[#696969] font-normal leading-[140%] text-base">Although the Store ID is injected only once for a new browser, it’s recommended to keep this component readily available. This ensures that if the Store ID is ever removed from local storage, it will be re-injected immediately, preventing any disruptions in the functionality of your code overrides.</p>
        </div>

        {/* Building e-commerce feature */}
        <div id="product-cms" className="mt-10">
            <h2 className="text-[#232327] font-semibold text-[32px]">Building the E-commerce features</h2>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">In this section, we'll walk through the steps to implement a fully functional E-commerce feature for your Framer site. You'll learn how to capture, manipulate, and process product data effectively. To manage the product data, we will utilize <span className="font-semibold text-[#232327]">Framer CMS.</span></p>

            {/* Creating product CMS */}
            <div className="mt-6">
                <h4 className="text-2xl font-semibold text-[#232327]">Creating product CMS</h4>
                <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Start by creating a Framer CMS collection to manage your product data. Each product may include key information such as : <strong className="text-[#232327]">Name</strong>, <strong className="text-[#232327]">Image</strong>, <strong className="text-[#232327]">Quantity</strong>, <strong className="text-[#232327]">Price</strong> & an <strong className="text-[#232327]">unique id</strong> (slug).</p>
                <img className="rounded-lg my-3 w-[90%] border border-[#EAEAEA]" src={cmsExample} alt="Product cms example" />
            </div>
        </div>

        <DataCollection />


        <Toaster />
    </article>

    return <>

        <SideBar content={content} />

    </>
}

export default Integration