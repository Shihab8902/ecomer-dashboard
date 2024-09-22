import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { UserContext } from '../context/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';





const Modal = ({ modalID, isModalVisible, setIsModalVisible, refetchStoreId }) => {

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [isStripeChecked, setIsStripeChecked] = useState(false);
    const [isYocoChecked, setIsYocoChecked] = useState(false);
    const { user } = useContext(UserContext);
    const axiosPublic = useAxiosPublic();

    //Handle store creation
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const storeName = e.target?.storeName?.value;
        const stripeSecret = e.target?.stripeSecret?.value;
        const yocoSecret = e.target?.yocoSecret?.value;
        const storeData = {
            storeName,
            stripeSecret,
            yocoSecret,
            admin: user.email
        }
        console.log(storeData)

        //Close modal
        setIsModalVisible(false);

        axiosPublic.post("/store", storeData)
            .then(() => {
                refetchStoreId();
                Swal.fire({
                    title: "Store Created!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });

            }).catch(error => {
                Swal.fire({
                    icon: "error",
                    text: error.response.data.message,
                    title: "Error!"
                })
            })



    }



    return <>

        {
            isModalVisible && <dialog id={modalID} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>


                    <div >
                        <h4 className="text-center font-semibold text-2xl text-[#232327]">Create Store</h4>
                        <form method="dialog" className="mt-5" onSubmit={handleFormSubmit} >
                            <div>
                                <label className="block text-lg mb-1 font-medium" htmlFor="name">Store Name</label>
                                <input className="w-full p-3 border border-[#D3D3D4]" type="text" name="storeName" id="storeName" placeholder="Enter store name" required />
                            </div>

                            {/* Choose payment method */}
                            <div className='mt-3'>
                                <label className="block text-lg mb-1 font-medium" htmlFor="paymentMethod">Select Payment Method</label>
                                <div >
                                    <div className='flex items-center justify-between border mt-2  h-12 px-3 border-[#D3D3D4]'>
                                        <input checked disabled className='w-5 h-5 cursor-pointer' type="checkbox" name="stripeCheckbox" id="stripeCheckbox" />
                                        <img className='w-14' src="cod.svg" alt="Cash on Delivery" />
                                    </div>
                                    <div className='flex items-center justify-between border border-t-0  h-12 px-3 border-[#D3D3D4]'>
                                        <input className='w-5 h-5 cursor-pointer' onChange={() => setIsStripeChecked(!isStripeChecked)} type="checkbox" name="stripeCheckbox" id="stripeCheckbox" />
                                        <img className='w-14' src="stripe.png" alt="Stripe" />
                                    </div>

                                    <div className='flex items-center justify-between border border-t-0 h-12  px-3 border-[#D3D3D4]'>
                                        <input className='w-5 h-5 cursor-pointer' onChange={() => setIsYocoChecked(!isYocoChecked)} type="checkbox" name="yocoCheckbox" id="yocoCheckbox" />
                                        <img className='w-14' src="yoco.svg" alt="YOCO" />
                                    </div>
                                </div>
                            </div>


                            {/* Render stripe secret field */}
                            {
                                isStripeChecked && <>
                                    <div className="relative mt-3">
                                        <label className="block text-lg mb-1 font-medium" htmlFor="stripeSecret">Stripe Secret Key</label>
                                        <input className="w-full p-3 border border-[#232327]" type={visiblePassword ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter stripe secret" required />
                                        <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-4 right-2 text-lg text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                    </div>
                                    <p className=" mt-1 text-[#232327] leading-6 text-sm">For retrieving your Stripe Secret, visit the <Link className="font-bold hover:underline" to="https://docs.stripe.com/keys" target='_blank'>Stripe API documentation.</Link></p>
                                </>
                            }


                            {/* Render yoco secret field */}
                            {
                                isYocoChecked && <>
                                    <div className="relative mt-3">
                                        <label className="block text-lg mb-1 font-medium" htmlFor="yocoSecret">YOCO Secret Key</label>
                                        <input className="w-full p-3 border border-[#232327]" type={visiblePassword ? "text" : "password"} name="yocoSecret" id="yocoSecret" placeholder="Enter YOCO secret" required />
                                        <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-4 right-2 text-lg text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                    </div>
                                    <p className=" mt-1 text-[#232327] leading-6 text-sm">For retrieving your YOCO Secret, visit the <Link className="font-bold hover:underline" to="https://developer.yoco.com/online/resources/integration-keys" target='_blank'>YOCO API documentation.</Link></p>
                                </>
                            }


                            <button type="submit" className="w-full bg-[#232327] p-3 text-white mt-5">Create</button>
                        </form>
                    </div>





                </div>
            </dialog>


        }




    </>




};

export default Modal;


