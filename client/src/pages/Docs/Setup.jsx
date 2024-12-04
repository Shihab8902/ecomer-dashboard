/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation } from 'react-router-dom';
import login from '../../assets/images/docs/login.png';
import storeCreation from '../../assets/images/docs/storeCreation.png';
import storeId from '../../assets/images/docs/storeId.png';
import paymentMethods from '../../assets/images/docs/paymentMethods.png';
import SideBar from '../../components/Docs/SlideBar';
import { useEffect } from 'react';



const Setup = () => {

    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView();
            }
        }else{
            window.scrollTo(0, 0)
        }
    }, [location]);



    const content = <div id="setup">
        <h1 className="text-[#232327] font-semibold  text-[32px]">Setup</h1>
        <p className="text-[#696969] font-normal leading-[140%] text-base mt-3">Setting up eComer is simple and streamlined. Whether you're using the native Framer plugin or the web backend at <Link className="underline text-[#232327]" to="/">ecomer.framax.com</Link>, the process is identical. Follow these steps to get started:</p>

        <iframe className="my-5 rounded-lg w-full h-[200px] md:h-[300px] lg:w-[90%] lg:h-[490px]" src="https://www.youtube.com/embed/_fuimO6ErKI?si=TQbUdoGaziGbHkly" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        {/* Login */}
        <div id="login" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Login with Google</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Visit <Link className="underline text-[#232327]" to="/">ecomer.framax.co</Link> or access the plugin within Framer and log in using your Google account.</p>
            <img className="rounded-lg my-3 w-full lg:w-[90%] border-[#EAEAEA]" src={login} alt="Login with Google example" />
        </div>

        {/* Store creation */}
        <div id="create-store" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Create your first store</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">After logging in, you will be prompted to create your first store. Provide the following details:</p>
            <ul className="ml-5">
                <li className="text-[#696969] font-normal leading-[140%] text-base mt-1 list-disc"><span className="text-[#232327] font-medium">Store name:</span> Choose a name for your store.</li>
                <li className="text-[#696969] font-normal leading-[140%] text-base mt-1 list-disc"><span className="text-[#232327] font-medium">Business location:</span> Specify the location of your store.</li>
                <li className="text-[#696969] font-normal leading-[140%] text-base mt-1 list-disc"><span className="text-[#232327] font-medium">Store currency:</span> Specify the currency you want to use for transactions.</li>
            </ul>
            <img className="rounded-lg my-3 w-full lg:w-[90%] border-[#EAEAEA]" src={storeCreation} alt="Store Creation example" />
            <p className="text-[#696969] font-normal leading-[140%] text-base ">These details can be edited anytime from the store settings.</p>
        </div>

        {/* Initial setup */}
        <div id="initial-setup" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Initial setup options</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Once your store is created, you'll be presented with initial setup options:</p>
            <ul className="ml-5">
                <li className="text-[#696969] font-normal leading-[140%] text-base mt-1 list-disc"><span className="text-[#232327] font-medium">Test the platform:</span> Remix the provided starter template to quickly explore eComer’s features.</li>
                <li className="text-[#696969] font-normal leading-[140%] text-base mt-1 list-disc"><span className="text-[#232327] font-medium">Integrate with your own project:</span> Refer to the <a href="#integration" className="underline text-[#232327]">Integration with existing project</a> section of this documentation for steps to connect eComer with your existing Framer project.</li>
            </ul>
        </div>

        {/* Store ID */}
        <div id="store-id" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Unique store ID</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">After completing the setup, you will receive a unique store ID. This ID is essential for identifying your store and integrating eComer into your projects. <br /> You can view and copy your store ID anytime from the Store Settings page.</p>
            <img className="rounded-lg my-3 border border-[#EAEAEA] w-full lg:w-[90%]" src={storeId} alt="Store id example" />
        </div>

        {/* Payment methods*/}
        <div id="payment-methods" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Configure payment methods</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Navigate to the <Link to="/payment" className="text-[#232327] underline">Payment</Link> page in the dashboard to configure payment options for your store. <br /> You can enable and customize options like Cash on Delivery or integrate available online payment gateways.</p>
            <img className="rounded-lg my-3 border border-[#EAEAEA] w-full lg:w-[90%]" src={paymentMethods} alt="Payment method configuration example" />
        </div>

    </div>


    return <>

        <SideBar content={content} />
    </>
}

export default Setup