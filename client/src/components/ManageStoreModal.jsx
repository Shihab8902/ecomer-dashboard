import { useState } from 'react';
import Swal from 'sweetalert2';
import { FaCopy, FaEye, FaRegEdit } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from '../hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';



const ManageStoreModal = ({ modalID, isModalVisible, setIsModalVisible, store, refetch }) => {

    const axiosPublic = useAxiosPublic();
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [isYocoSecretFieldVisible, setIsYocoSecretFieldVisible] = useState(false);
    const [isStripeSecretFieldVisible, setIsStripeSecretFieldVisible] = useState(false);
    const [isStripeChecked, setIsStripeChecked] = useState(false);
    const [isYocoChecked, setIsYocoChecked] = useState(false);

    const handleFormSubmit = e => {
        e.preventDefault();
        const storeName = e.target.storeName.value;
        const stripeSecret = e.target?.stripeSecret?.value || store?.stripeSecret || e.target?.newStripeSecret?.value
        const yocoSecret = e.target?.yocoSecret?.value || store?.yocoSecret || e.target?.newYocoSecret?.value

        axiosPublic.put(`/store?id=${store?._id}`, { storeName, stripeSecret, yocoSecret })
            .then(res => {
                if (res.data) {
                    setIsModalVisible(false);
                    refetch();
                    Swal.fire({
                        icon: "success",
                        text: "Store updated successfully!",
                        timer: 1500,
                        showConfirmButton: false
                    });

                }
            })
    }


    //Handle Store Id copy
    const handleStoreIdCopy = () => {
        navigator.clipboard.writeText(store?.storeId)
            .then(() => {
                toast.success("Copied to Clipboard!");
            })
    }

    //Format stripe secret
    const formatSecret = (secret) => {
        if (!secret) return '';
        const length = secret.length;
        const lastFour = secret.slice(-4);
        const maskedPart = '*'.repeat(length - 4);
        return maskedPart + lastFour;
    };




    return <>

        {
            isModalVisible && <dialog id={modalID} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>


                    <div >
                        <h4 className="text-center font-semibold text-2xl text-[#232327]">Manage Store</h4>

                        <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>

                            {/* Store Name */}
                            <div>
                                <label className="block text-lg mb-1 font-medium" htmlFor="storeName">Store Name</label>
                                <input className="w-full p-3 border border-[#D3D3D4]" type="text" name="storeName" id="storeName" defaultValue={store?.storeName} required />
                            </div>

                            {/* Store id */}
                            <div>
                                <label className="block text-lg mb-1 font-medium" htmlFor="storeName">Store ID</label>
                                <div className="w-full p-3 border flex justify-between items-center border-gray-100 bg-gray-100">
                                    {store?.storeId} <span title='Copy Store ID' onClick={handleStoreIdCopy} className='cursor-pointer'><FaCopy /></span>
                                </div>
                            </div>


                            {/* Render new payment method integration */}
                            <div className='mt-2'>
                                <label className="block text-lg mb-1 font-medium" htmlFor="paymentMethod">Select Payment Method</label>
                                <div >
                                    <div className='flex items-center justify-between border mt-2  h-12 px-3 border-[#D3D3D4]'>
                                        <input checked disabled className='w-5 h-5 cursor-pointer' type="checkbox" name="stripeCheckbox" id="stripeCheckbox" />
                                        <img className='w-14' src="cod.svg" alt="Cash on Delivery" />
                                    </div>

                                    <div className='flex items-center justify-between border border-t-0  h-12 px-3 border-[#D3D3D4]'>
                                        <input disabled={store?.stripeSecret} checked={store?.stripeSecret} className='w-5 h-5 cursor-pointer' onChange={() => setIsStripeChecked(!isStripeChecked)} type="checkbox" name="stripeCheckbox" id="stripeCheckbox" />
                                        <img className='w-14' src="stripe.png" alt="Stripe" />
                                    </div>

                                    <div className='flex items-center justify-between border border-t-0 h-12  px-3 border-[#D3D3D4]'>
                                        <input disabled={store?.yocoSecret} checked={store?.yocoSecret} className='w-5 h-5 cursor-pointer' onChange={() => setIsYocoChecked(!isYocoChecked)} type="checkbox" name="yocoCheckbox" id="yocoCheckbox" />
                                        <img className='w-14' src="yoco.svg" alt="YOCO" />
                                    </div>
                                </div>
                            </div>


                            {/* Render stripe secret field */}
                            {
                                isStripeChecked && <>
                                    <div className="relative mt-3">
                                        <label className="block text-lg mb-1 font-medium" htmlFor="newStripeSecret">Stripe Secret Key</label>
                                        <input className="w-full p-3 border border-[#232327]" type={visiblePassword ? "text" : "password"} name="newStripeSecret" id="newStripeSecret" placeholder="Enter stripe secret" required />
                                        <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-4 right-2 text-lg text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                    </div>
                                    <p className=" mt-1 text-[#232327] leading-6 text-sm">For retrieving your Stripe Secret, visit the <Link className="font-bold hover:underline" to="https://docs.stripe.com/keys" target='_blank'>Stripe API documentation.</Link></p>
                                </>
                            }


                            {/* Render yoco secret field */}
                            {
                                isYocoChecked && <>
                                    <div className="relative mt-3">
                                        <label className="block text-lg mb-1 font-medium" htmlFor="newYocoSecret">YOCO Secret Key</label>
                                        <input className="w-full p-3 border border-[#232327]" type={visiblePassword ? "text" : "password"} name="newYocoSecret" id="newYocoSecret" placeholder="Enter YOCO secret" required />
                                        <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-4 right-2 text-lg text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                    </div>
                                    <p className=" mt-1 text-[#232327] leading-6 text-sm">For retrieving your YOCO Secret, visit the <Link className="font-bold hover:underline" to="https://developer.yoco.com/online/resources/integration-keys" target='_blank'>YOCO API documentation.</Link></p>
                                </>
                            }



                            {/* Render Stripe credentials */}
                            {
                                store?.stripeSecret && <>
                                    {/* Stripe Secret */}
                                    <div>
                                        <label className="block text-lg mb-1 font-medium" htmlFor="storeName">Stripe Secret</label>
                                        <div className="w-full p-3 border flex justify-between  border-gray-100 bg-gray-100">
                                            <p className='w-full text-sm overflow-x-auto break-words pr-2'>{formatSecret(store?.stripeSecret)}</p> <span title='Update Stripe Secret' onClick={() => setIsStripeSecretFieldVisible(!isStripeSecretFieldVisible)} className='cursor-pointer'><FaRegEdit className='text-2xl' /></span>
                                        </div>
                                    </div>

                                    {/* Stripe Secret field */}
                                    {
                                        isStripeSecretFieldVisible && <div className="relative">
                                            <label className="block text-lg mb-1 font-medium" htmlFor="stripeSecret">Update Secret</label>
                                            <input className="w-full p-3 border border-[#D3D3D4]" type={visiblePassword ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder='Enter new stripe secret' />
                                            <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-4 right-2 text-lg text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                        </div>
                                    }
                                </>
                            }



                            {/* Render YOCO credentials */}
                            {
                                store?.yocoSecret && <>
                                    {/* YOCO Secret */}
                                    <div>
                                        <label className="block text-lg mb-1 font-medium" htmlFor="yocoSecret">YOCO Secret</label>
                                        <div className="w-full p-3 border flex justify-between  border-gray-100 bg-gray-100">
                                            <p className='w-full text-sm overflow-x-auto break-words pr-2'>{formatSecret(store?.yocoSecret)}</p> <span title='Update YOCO Secret' onClick={() => setIsYocoSecretFieldVisible(!isYocoSecretFieldVisible)} className='cursor-pointer'><FaRegEdit className='text-2xl' /></span>
                                        </div>
                                    </div>

                                    {/* YOCO Secret field */}
                                    {
                                        isYocoSecretFieldVisible && <div className="relative">
                                            <label className="block text-lg mb-1 font-medium" htmlFor="yocoSecret">Update Secret</label>
                                            <input className="w-full p-3 border border-[#D3D3D4]" type={visiblePassword ? "text" : "password"} name="yocoSecret" id="yocoSecret" placeholder='Enter new YOCO secret' />
                                            <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-4 right-2 text-lg text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                        </div>
                                    }
                                </>
                            }




                            <button type="submit" className="w-full bg-[#232327] p-3 text-white mt-3">Update Store</button>
                        </form>

                    </div>
                    <Toaster />



                </div>
            </dialog>


        }




    </>




};

export default ManageStoreModal;


