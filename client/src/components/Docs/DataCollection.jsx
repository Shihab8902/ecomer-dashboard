/* eslint-disable react/no-unescaped-entities */
import emptyCode from '../../assets/images/docs/emptyCode.png';
import overrideAdd from '../../assets/images/docs/overrideAdd.png';
import { CopyBlock, googlecode } from 'react-code-blocks';
import overrides from '../../assets/code/overrides';


const DataCollection = () => {
    return <div className="mt-6" id="product-data">
        {/* Heading */}
        <div className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Collecting product data</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Once the CMS collection is set up, create a product details page. This page will be used to collect the product data. </p>
            <p className="text-[#696969] font-normal leading-[140%] text-base">Since Framer doesn't provide a CMS API to interact with, we'll use a series of code overrides to capture product information from the details page. This approach involves periodically checking the data fields at intervals of 500-1000ms, ensuring the latest data is always collected. </p>
            <p className="text-[#696969] font-normal leading-[140%] text-base">However, as this process can be resource-intensive, it's recommended to keep the product data minimal for optimal performance.</p>
            <p className="text-[#696969] font-normal leading-[140%] text-base">Start by creating a code override file from the <span className="text-[#232327] font-medium">Framer Assets panel &gt; Code.</span> </p>
            <img className="rounded-lg my-3 w-[90%] border border-[#EAEAEA]" src={emptyCode} alt="empty code file example" />
            <p className="text-[#696969] font-normal leading-[140%] text-base">Next, add the following boilerplate code to the file:</p>
            <div className='my-3 bg-gray-100 max-h-[490px] overflow-auto w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.boilerplate.code}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>

        </div>

        {/* Collecting product name */}
        <div id="product-name" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Collecting product name</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Now, we're ready to collect the product name. Copy the following code override and paste it into your override file. Ensure that each piece of code is placed separately, without nesting them within each other. Once added, apply the override to the product name within the product details page.</p>
            <div className='my-3 max-h-[490px] overflow-auto bg-gray-100 w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.productName?.code}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>
            <p className="text-[#232327]  font-semibold leading-[140%] text-base mt-2">Here is an example of applying the override to an element. All overrides are added in a similar way.</p>
            <img className="rounded-lg my-3 w-[90%] border border-[#EAEAEA]" src={overrideAdd} alt="Code override adding example" />
        </div>

        {/* Collecting product id */}
        <div id="product-id" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Collecting product ID</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Collecting the product ID is similar to collecting the product name. <strong className='text-[#232327]'>The ID is crucial for uniquely identifying the product within the code logic.</strong> Paste the following code into the override file and apply the override to the product slug on the details page. (You can make the slug invisible if needed, but ensure it remains present in the DOM.)</p>
            <div className='my-3 max-h-[490px] overflow-auto bg-gray-100 w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.productId?.code}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>

        </div>


        {/* Collecting product price */}
        <div id="product-price" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Collecting product price</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Collecting the product price may slightly vary depending on the currency you are using.</p>
            <p className="text-[#696969] font-normal leading-[140%] text-base ">First, let’s look at how to collect the price in USD or any currency without comma separation. If you're using a currency symbol other than "$" or a different prefix before the actual price, please replace the "$" in the code with the appropriate symbol or prefix.</p>
            <p className="text-[#696969] font-normal leading-[140%] text-base ">Apply the override to the product price on the details page.</p>
            <strong className="text-[#2323237] leading-[140%] text-base ">For collecting non-comma separated price. (e.g:$99.99)</strong>
            <div className='my-3 max-h-[490px] overflow-auto bg-gray-100 w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.productPrice?.nonCommaSeparatedCode}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>
            <strong className="text-[#2323237] leading-[140%] text-base ">If you're using comma-separated prices (e.g: 30,000IQR), use this override instead. Be sure to replace the symbol or prefix in the code if it doesn't match your currency.</strong>
            <div className='my-3 max-h-[490px] overflow-auto bg-gray-100 w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.productPrice?.commaSeparatedCode}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>

        </div>

        {/* Collecting product image */}
        <div id="product-image" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Collecting product image</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Collecting the product image depends on how it is displayed on the details page. If the image is shown directly on the details page without a slider, use the following code override and attach it to the image frame.</p>
            <div className='my-3 max-h-[490px] overflow-auto bg-gray-100 w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.productImage?.singleImageCode}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>
            <strong className="text-[#2323237] leading-[140%] text-base ">If you are using Framer Slideshow component, use the following override instead.</strong>
            <div className='my-3 max-h-[490px] overflow-auto bg-gray-100 w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.productImage?.sliderImageCode}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>
        </div>

        {/* Collecting order quantity */}
        <div id="order-quantity" className="mt-6">
            <h4 className="text-2xl font-semibold text-[#232327]">Collecting order quantity</h4>
            <p className="text-[#696969] font-normal leading-[140%] text-base mt-2">Collecting the order quantity requires three separate code overrides: one to increase the quantity, one to decrease it, and another to capture the value. This is necessary as Framer does not provide a built-in method for handling quantity changes. </p>
            <p className="text-[#232327] font-medium leading-[140%] text-base">Apply the following override to the increase button:</p>
            <div className='my-3 max-h-[490px] overflow-auto bg-gray-100 w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.orderQuantity?.increaseButtonCode}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>
            <p className="text-[#232327] font-medium leading-[140%] text-base">Apply this override to the decrease button:</p>
            <div className='my-3 max-h-[490px] overflow-auto bg-gray-100 w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.orderQuantity?.decreaseButtonCode}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>
            <p className="text-[#232327] font-medium leading-[140%] text-base">Finally, add this override to the text element to display the quantity output:</p>
            <div className='my-3 max-h-[490px] overflow-auto bg-gray-100 w-[90%] fira-code p-5 border border-[#EAEAEA] rounded-lg'>
                <CopyBlock
                    language='jsx'
                    text={overrides?.orderQuantity?.displayValueCode}
                    showLineNumbers={true}
                    theme={googlecode}
                    wrapLines={true}
                />
            </div>

        </div>


    </div>
}

export default DataCollection