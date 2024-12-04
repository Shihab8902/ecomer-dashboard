/* eslint-disable react/no-unescaped-entities */
import { useLocation } from "react-router-dom";
import SideBar from "../components/Docs/SlideBar"
import { useEffect } from "react";


const Docs = () => {


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


    const content = <div>
        {/* Heading Section */}
        <div className=" flex flex-col mt-4 justify-center items-center bg-gray-100 py-6 rounded-md w-full lg:w-3/4 mx-auto">
            <h3 className="text-[#232327] text-2xl lg:text-[28px] leading-[140%] font-semibold">eComer</h3>
            <h3 className="text-3xl lg:text-4xl font-bold text-[#696969]">Documentation</h3>
        </div>
        <div className="w-full h-[1px] bg-[#0000001A] mt-10 mb-12"></div>

        <div id="introduction">
            <h1 className="text-[#232327] font-semibold text-[26px] lg:text-[32px]">Introduction to eComer</h1>

            <p className="text-[#696969] font-normal leading-[140%] text-base mt-3">Welcome to the eComer Documentation! This guide provides everything you need to seamlessly integrate and use eComer, your complete eCommerce solution, in Framer. Whether you're building a sleek storefront or managing multiple stores, eComer empowers you with tools to handle orders, streamline payments, and deliver a standard shopping experience.</p>

            <h4 className="text-xl font-semibold text-[#232327] mt-3">What is eComer?</h4>

            <p className="text-[#696969] font-normal leading-[140%] text-base mt-1">eComer is a comprehensive solution designed to seamlessly integrate eCommerce functionality into your Framer projects. It offers two powerful tools to help you create and manage your online stores.</p>
            <ul className="ml-5">
                <li className="text-[#696969] font-normal leading-[140%] text-base mt-1 list-disc"><span className="text-[#232327] font-medium">Native Framer Plugin:</span> Manage your stores, process orders, and streamline payments directly within the Framer environment.</li>
                <li className="text-[#696969] font-normal leading-[140%] text-base mt-1 list-disc"><span className="text-[#232327] font-medium">Web Backend Dashboard: </span> A robust online platform for creating stores, processing orders, and configuring payment settings.</li>
            </ul>

            <p className="text-[#696969] font-normal leading-[140%] text-base mt-1">With eComer, you can e easily combine the visual design power of Framer with essential eCommerce features, enabling smooth order and payment management while scaling your online business.</p>
            <iframe className="my-5 rounded-lg w-full h-[200px] md:h-[300px] lg:w-[90%] lg:h-[490px]" src="https://www.youtube.com/embed/_fuimO6ErKI?si=TQbUdoGaziGbHkly" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        </div>

    </div>


    return <>
        <SideBar content={content} />
    </>
}

export default Docs