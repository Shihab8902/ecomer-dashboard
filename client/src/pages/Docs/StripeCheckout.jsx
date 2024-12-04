/* eslint-disable react/no-unescaped-entities */
import { useLocation } from 'react-router-dom';
import SideBar from '../../components/Docs/SlideBar';
import { useEffect } from 'react';
import { CopyBlock, googlecode } from 'react-code-blocks';
import overrides from '../../assets/code/overrides';


const StripeCheckout = () => {

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



    const content = <div id="setup">
        <h1 className="text-[#232327] font-semibold text-[32px]">Checkout with Stripe</h1>
        <p className="text-[#696969] font-normal leading-[140%] text-base mt-3">eComer also supports Stripe for checkout, providing a secure and versatile payment gateway for your store. To enable Stripe checkout, first ensure that the Stripe payment method is activated for your store. If it isn’t enabled, refer to the <a href='/docs/setup#payment-methods' className='underline text-[#232327]'>Configure Payment Methods</a> section for guidance.</p>

        <iframe className="my-5 rounded-lg " width="90%" height="490" src="https://www.youtube.com/embed/_fuimO6ErKI?si=TQbUdoGaziGbHkly" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Once activated, add the following code override to a button. For better organization, it’s recommended to place the code in a separate override file. </p>
        <div className='my-3 max-h-[490px] overflow-auto bg-gray-100 w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
            <CopyBlock
                language='jsx'
                text={overrides?.stripeCheckout?.code}
                showLineNumbers={true}
                theme={googlecode}
                wrapLines={true}
            />
        </div>

        <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">As with the cash-on-delivery checkout process, customers will be redirected to the <span className='text-[#232327] font-semibold'>"/thank-you"</span> route after a successful purchase and to the <span className='font-semibold text-[#232327]'>"/cancel"</span> route if the purchase fails. Make sure your project includes these pages to manage these scenarios effectively. </p>
    </div>


    return <>

        <SideBar content={content} />
    </>
}

export default StripeCheckout