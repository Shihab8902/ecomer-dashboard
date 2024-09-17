import { useState } from 'react';
import Swal from 'sweetalert2';
import { FaCopy, FaEye, FaRegEdit } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from '../hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';






const ManageStoreModal = ({ modalID, isModalVisible, setIsModalVisible, store, refetch }) => {

    const axiosPublic = useAxiosPublic();
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [isSecretFieldVisible, setIsSecretFieldVisible] = useState(false);

    const handleFormSubmit = e => {
        e.preventDefault();
        const storeName = e.target.storeName.value;
        const stripeSecret = e.target.stripeSecret?.value || store?.stripeSecret

        axiosPublic.put(`/store?id=${store?._id}`, { storeName, stripeSecret })
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


    //    Handle Store Id copy
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
                                <input className="w-full p-3 border border-[#232327]" type="text" name="storeName" id="storeName" defaultValue={store?.storeName} required />

                            </div>

                            {/* Stripe Secret */}
                            <div>
                                <label className="block text-lg mb-1 font-medium" htmlFor="storeName">Stripe Secret</label>
                                <div className="w-full p-3 border flex justify-between  border-gray-100 bg-gray-100">
                                    <p className='w-full text-sm overflow-x-auto break-words pr-2'>{formatSecret(store?.stripeSecret)}</p> <span title='Update Stripe Secret' onClick={() => setIsSecretFieldVisible(!isSecretFieldVisible)} className='cursor-pointer'><FaRegEdit className='text-2xl' /></span>
                                </div>
                            </div>

                            {/* Stripe Secret field */}
                            {
                                isSecretFieldVisible && <div className="relative">
                                    <label className="block text-lg mb-1 font-medium" htmlFor="stripeSecret">Update Secret</label>
                                    <input className="w-full p-3 border border-[#232327]" type={visiblePassword ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder='Enter new stripe secret' />
                                    <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-4 right-2 text-lg text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>
                            }

                            {/* Store id */}
                            <div>
                                <label className="block text-lg mb-1 font-medium" htmlFor="storeName">Store ID</label>
                                <div className="w-full p-3 border flex justify-between items-center border-gray-100 bg-gray-100">
                                    {store?.storeId} <span title='Copy Store ID' onClick={handleStoreIdCopy} className='cursor-pointer'><FaCopy /></span>
                                </div>
                            </div>

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


