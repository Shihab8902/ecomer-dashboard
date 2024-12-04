/* eslint-disable react/no-unescaped-entities */

import { Link, useLocation } from "react-router-dom";
import SideBar from "../../components/Docs/SlideBar"
import { useEffect } from "react";


const Support = () => {

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
        <div>
            <h1 className="text-[#232327] font-semibold text-[32px]">Help & support</h1>

            <p className="text-[#696969] font-normal leading-[140%] text-base mt-3">eComer is a continuously evolving solution, and your feedback plays a crucial role in shaping its future development. We value your input and strive to provide the best experience for integrating eCommerce into your Framer projects.</p>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">If you encounter any issues during integration, experience bugs or glitches, or have suggestions for improvements, please don’t hesitate to reach out. Your support and feedback are greatly appreciated!</p>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">For assistance or to share your feedback,  feel free to contact contact us at <Link className="font-semibold text-[#232327] underline" to="mailto:hello@framax.co">hello@framax.co</Link>. </p>



        </div>

    </div>


    return <>
        <SideBar content={content} />
    </>
}

export default Support