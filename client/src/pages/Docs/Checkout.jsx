/* eslint-disable react/no-unescaped-entities */
import { useLocation } from 'react-router-dom';
import SideBar from '../../components/Docs/SlideBar';
import { useEffect } from 'react';
import formId from '../../assets/images/docs/formId.png';
import { CopyBlock, googlecode } from 'react-code-blocks';
import overrides from '../../assets/code/overrides';
import inputFieldName from '../../assets/images/docs/inputFieldName.png'
import modifiedCode from '../../assets/images/docs/modifiedCode.png';



const Checkout = () => {

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
        <h1 className="text-[#232327] font-semibold text-[32px]">Handling Checkout</h1>
        <p className="text-[#696969] font-normal leading-[140%] text-base mt-3">This section will guide you on integrating the available checkout process into your eCommerce store using "eComer."</p>
        <iframe className="my-5 rounded-lg w-full h-[200px] md:h-[300px] lg:w-[90%] lg:h-[490px]" src="https://www.youtube.com/embed/_fuimO6ErKI?si=TQbUdoGaziGbHkly" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        {/* Cash on delivery checkout */}
        <div id="checkout-cod" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Checkout without payments (Cash on Delivery)</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">To enable checkout without payments, we'll use a Framer form to collect the customer’s personal and shipping information. First assign the form element an ID using the scroll section in the property panel. The ID should be set to <span className='text-[#232327] font-semibold'>"checkoutform"</span>.  </p>
            <img className="rounded-lg my-3 w-full lg:w-[90%] border border-[#EAEAEA]" src={formId} alt="Form id example" />
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Apply the following override to the <strong className='text-[#232327] font-semibold'>Form Submit</strong> button.  </p>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">We recommend creating a separate code override file to manage the cash-on-delivery process. For this example, we’ve created a file named <strong className='text-[#232327] font-semibold'>"Handle COD Delivery"</strong> and added the following code to it. </p>
            <div className='my-3 lg:max-h-[490px] overflow-auto bg-gray-100 w-[90vw] text-xs lg:text-base lg:w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.codCheckout?.code}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>
            <p className="text-[#696969]  font-normal leading-[140%] text-base mt-2">Once the checkout process is completed, the customer will be redirected to the <span className='text-[#232327] font-semibold'>"/thank-you" </span>route if the order is successfully placed, or to the <span className='text-[#232327] font-semibold'>"/cancel"</span> route if the order fails. Ensure your project includes these pages to handle these scenarios effectively.</p>
            <h4 className="text-xl font-semibold text-[#232327] mt-3">How to collect different user data?</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-1">In this example we are using form fields for collecting: name, email, city, country, postal code , state and two additional address field.</p>
            <p className='text-[#696969] font-normal leading-[140%] text-base'>If you want to customize the form fields to collect different data, you can do so with a few simple steps. Let’s add a field for the customer’s phone number as an example:</p>

        <ul className='ml-5'>
            <li className='text-[#696969] font-normal leading-[140%] text-base mt-1 list-decimal'>Ensure the input field is properly and uniquely named. For this example, let’s name it <span className='font-semibold text-[#232327]'>phone</span>.</li>
            <li className='text-[#696969] font-normal leading-[140%] text-base mt-1 list-decimal'>Add any necessary form validation as required.</li>
            <img className="rounded-lg my-3 w-full lg:w-[90%] border border-[#EAEAEA]" src={inputFieldName} alt="Input field name example" />
            <li className='text-[#696969] font-normal leading-[140%] text-base mt-1 list-decimal'>Once the form field is added, update the code by adding an object key <span className='text-[#232327] font-semibold'>"phone"</span> after the email field. For its value, write <span className='text-[#232327] font-semibold'>"form.phone.value"</span>.</li>
            <img className="rounded-lg my-3 w-full lg:w-[90%] border border-[#EAEAEA]" src={modifiedCode} alt="Modified code preview" />
        </ul>


        <p className='text-[#696969] font-normal leading-[140%] text-base'>If you have any additional customer data beside these, put them on an array named “additionalCustomerData” in key:value pair.</p>
        <p className='text-[#696969] font-normal leading-[140%] text-base'>If you have other address data beside the example, simply put them under the address in key: value pair. </p>
        <p className='text-[#232327] font-semibold leading-[140%] text-base'>Please keep in mind that the key names you define for these fields will appear as key names in the dashboard preview. For example, if you name the key Country and pass a value, it will display in the backend dashboard as Country: &lt;customer provided country name&gt;. </p>

        </div>

    </div>


    return <>

        <SideBar content={content} />
    </>
}

export default Checkout