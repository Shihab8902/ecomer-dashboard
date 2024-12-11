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
import { CopyBlock, googlecode } from 'react-code-blocks';
import currencySymbol from '../../assets/images/docs/currencySymbol.png';
import overrides from "../../assets/code/overrides";

const Integration = () => {
    const [isComponentCopied, setIsComponentCopied] = useState({});

    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView();
            }
        } else {
            window.scrollTo(0, 0)
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


    const content = <div id="integration">
        <h1 className="text-[#232327] font-semibold text-[26px] lg:text-[32px]">Integration with existing project</h1>
        <p className="text-[#696969] font-normal leading-[140%] text-base mt-3">This section guides you through integrating eComer with your existing <strong>Framer</strong> project. The integration process involves using a combination of custom code components and code overrides to seamlessly connect your project with eComer’s functionality. </p>
        <iframe className="my-5 rounded-lg lg:w-[90%] lg:h-[490px] w-full md:h-[300px] h-[200px]" src="https://www.youtube.com/embed/_fuimO6ErKI?si=TQbUdoGaziGbHkly" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        {/* Cart preview */}
        <div id="cart-preview" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Cart Preview</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">The Cart Preview component provides an interactive summary of the items in the shopping cart. Users can increase or decrease the quantity of products directly within the cart or remove items as needed. The component updates in real time with the user interaction, ensuring a seamless shopping experience. <br /> Additionally, it offers customizable design options through provided property controls, allowing you to style the cart to match your project’s aesthetics.</p>
            <div className="w-full lg:w-[90%] relative bg-gray-100 border-[#EAEAEA] border rounded-lg p-10 md:h-[300px] h-[200px] lg:h-[490px] my-3">
                <img className=" mt-8 rounded-lg w-full  h-full" src={cartPreview} alt="Cart preview component example" />
                <button onClick={() => handleComponentCopy("https://framer.com/m/Cart-Preview-lZDY.js", 1)} className="absolute right-3 top-3 bg-[#232327] text-white font-semibold leading-[150%] text-sm py-3 px-8 rounded flex items-center gap-3">Copy component <span>{isComponentCopied[1] ? <IoCheckmarkOutline /> : <FaRegCopy />}</span></button>
            </div>
        </div>

        {/* Cart Summary preview */}
        <div id="cart-summary-preview" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Cart Summary Preview</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">The Order Tracker component allows users to check their orders and track the status of each order, from processing to delivery. This component enhances the shopping experience by keeping users informed. It is also fully customizable using the provided property controls, allowing you to fully modify its design to match your project aesthetics.</p>
            <div className="w-full lg:w-[90%] relative bg-gray-100 border-[#EAEAEA] border rounded-lg p-10 h-[200px] md:h-[300px] lg:h-[490px] my-3">
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
            <div className="w-full lg:w-[90%] relative bg-gray-100 border-[#EAEAEA] border rounded-lg p-10 h-[200px] md:h-[300px] lg:h-[490px] my-3">
                <img className=" mt-8 rounded-lg w-full  h-full" src={orderTracker} alt="Order tracker component example" />
                <button onClick={() => handleComponentCopy("https://framer.com/m/Order-Tracker-2P9V.js", 3)} className="absolute right-3 top-3 bg-[#232327] text-white font-semibold leading-[150%] text-sm py-3 px-8 rounded flex items-center gap-3">Copy component <span>{isComponentCopied[3] ? <IoCheckmarkOutline /> : <FaRegCopy />}</span></button>
            </div>
        </div>

        {/* eComer settings */}
        <div id="ecomer-settings" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">eComer Settings</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">The eComer Settings is a utility component designed to simplify the process of managing different store settings and preference across your project. Currently the component is used to provide the Store ID and store currency. It automatically injects these information into the browser's local storage, ensuring that all code overrides and components requiring the Store ID & currency preference can access it without needing manual input for each of them.</p>
            <p className="text-[#232327] font-semibold leading-[140%] text-base mt-2">To use the component, provide your Store ID & currency preference (Currency symbol & Symbol position) through its property control and place it within a shared component in your project, such as a navbar or footer, which is present across multiple pages.</p>
            <div className="w-full lg:w-[90%] relative bg-gray-100 border-[#EAEAEA] border rounded-lg p-10 h-[200px] md:h-[300px] lg:h-[490px] my-3">
                <img className=" mt-8 rounded-lg w-full  h-full" src={storeIdInjector} alt="Store id injector component example" />
                <button onClick={() => handleComponentCopy("https://framer.com/m/eComer-Settings-mStu.js", 4)} className="absolute right-3 top-3 bg-[#232327] text-white font-semibold leading-[150%] text-sm py-3 px-8 rounded flex items-center gap-3">Copy component <span>{isComponentCopied[4] ? <IoCheckmarkOutline /> : <FaRegCopy />}</span></button>
            </div>
            <p className="text-[#696969] font-normal leading-[140%] text-base">Although these information is injected only once for a new browser, it's recommended to keep this component readily available. This ensures that if these information is ever removed from local storage, it will be re-injected immediately, preventing any disruptions in the functionality of your code overrides.</p>
            <h4 className="text-xl font-semibold text-[#232327] mt-3">How to Set the Currency Symbol in a Framer Project Using "eComer Settings"?</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">First, configure the currency symbol and specify whether it should appear before or after the price in the "eComer Settings." Then, apply the following override to the price value.</p>
            <div className='my-3 lg:max-h-[490px] overflow-auto bg-gray-100 w-[90vw] text-xs lg:text-base lg:w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.productPrice.currencySymbol}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>
            <p className="text-[#696969] font-normal leading-[140%] text-base">Ensure that Framer's text formatting is not used to set the currency symbol. Doing so may lead to a double currency symbol and issues with <a href="/docs/integration#product-price" className="hover:underline">product price collection</a>.</p>
            <img className="rounded-lg my-3 w-full lg:w-[90%] border border-[#EAEAEA]" src={currencySymbol} alt="currency symbol example" />
        </div>

        {/* Building e-commerce feature */}
        <div id="product-cms" className="mt-10">
            <h2 className="text-[#232327] font-semibold text-[26px] lg:text-[32px]">Building the E-commerce features</h2>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">In this section, we'll walk through the steps to implement a fully functional E-commerce feature for your Framer site. You'll learn how to capture, manipulate, and process product data effectively. To manage the product data, we will utilize <span className="font-semibold text-[#232327]">Framer CMS.</span></p>

            {/* Creating product CMS */}
            <div className="mt-6">
                <h4 className="text-2xl font-semibold text-[#232327]">Creating product CMS</h4>
                <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Start by creating a Framer CMS collection to manage your product data. Each product may include key information such as : <strong className="text-[#232327]">Name</strong>, <strong className="text-[#232327]">Image</strong>, <strong className="text-[#232327]">Quantity</strong>, <strong className="text-[#232327]">Price</strong> & an <strong className="text-[#232327]">unique id</strong> (slug).</p>
                <img className="rounded-lg my-3 w-full lg:w-[90%] border border-[#EAEAEA]" src={cmsExample} alt="Product cms example" />
            </div>
        </div>

        {/* Collecting product data */}
        <DataCollection />

        {/* Add to cart button setup */}
        <div id="add-to-cart" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Setting up the Add to cart button</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Once all the essential product data has been collected, we can move on to adding it to the cart. Apply the following code override to the Add to Cart button. This will store the product data in local storage for use during the checkout process later.</p>
            <div className='my-3  w-[90vw] lg:max-h-[490px]  overflow-auto text-xs lg:text-base  bg-gray-100  lg:w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.addToCartButton?.code}
                    showLineNumbers={true}
                    theme={googlecode}
                    codeBlock
                    wrapLines={true}
                />
            </div>
            <p className="text-[#696969] font-normal leading-[140%] text-base"><span className="text-[#232327] font-medium">Note:</span> This override checks for item duplication in the cart based on the product ID. If the same product already exists, it will update the quantity of the existing item rather than adding a new entry. </p>
        </div>

        {/* Display product subtotal */}
        <div id="subtotal-display" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Display product subtotal</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Apply the following override to a text element to display the subtotal amount for the cart items. If you're using a currency other than USD, make sure to replace the currency symbol in the code accordingly.</p>
            <div className='my-3 lg:max-h-[490px] overflow-auto bg-gray-100 w-[90vw] text-xs lg:text-base lg:w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.displaySubtotal?.code}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>

        </div>

        {/* Display cart total */}
        <div id="cart-total" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Display total cart items</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Attach the following override to a text element to display the total count of items in the cart.</p>
            <div className='my-3 lg:max-h-[490px] overflow-auto bg-gray-100 w-[90vw] text-xs lg:text-base lg:w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.displayCartTotal?.code}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>
        </div>

        {/* Hide UI */}
        <div id="cart-total" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Hide UI elements</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">If you want to show or hide an element based on the presence of items in the cart, apply the following override to that element.</p>
            <div className='my-3 lg:max-h-[490px] overflow-auto bg-gray-100 w-[90vw] text-xs lg:text-base lg:w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.hideUI?.code}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>
        </div>






        <Toaster />
    </div>

    return <>

        <SideBar content={content} />

    </>
}

export default Integration