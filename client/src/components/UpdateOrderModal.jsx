import { useState } from 'react';
import Swal from 'sweetalert2';

import useAxiosPublic from '../hooks/useAxiosPublic';
import moment from 'moment';





const UpdateOrderModal = ({ modalID, isModalVisible, setIsModalVisible, order, refetch }) => {



    const [status, setStatus] = useState('');

    const axiosPublic = useAxiosPublic();


    const handleFormSubmit = e => {
        e.preventDefault();

        const exp_deliver = e.target.exp_deliver.value;
        const data = {
            exp_deliver,
            newStatus: {
                message: e.target.fulfillmentStatus.value || "Order Completed",
                date: moment().format('Do MMMM YYYY')
            }
        }

        axiosPublic.put(`orders?id=${order._id}`, data)
            .then(res => {
                if (res.data) {
                    e.target.reset();
                    setIsModalVisible(false);
                    refetch();
                    Swal.fire({
                        text: "Order updated successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                        icon: "success"
                    })
                }
            })
    }



    return <>

        {
            isModalVisible && <dialog id={modalID} className="modal">
                <div className="modal-box">

                    <button onClick={() => setIsModalVisible(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>



                    <div >
                        <h4 className="text-center font-semibold text-2xl text-[#232327]">Update Order</h4>
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label className="block text-sm mb-1 font-medium" htmlFor="order status">Fulfillment Status</label>
                                <select onChange={(e) => setStatus(e.target.value)} value={status} defaultValue={order?.status?.map(status => status.message)[order.status.length - 1]} name="fulfillmentStatus" id="fulfillmentStatus" className="w-full cursor-pointer p-3 border border-[#232327]">
                                    <option value="Order Received" disabled>Order Received</option>
                                    <option disabled={order?.status?.find(s => s.message === "Preparing Order")} value="Preparing Order">Preparing Order</option>
                                    <option disabled={order?.status?.find(s => s.message === "Order Shipped")} value="Order Shipped">Order Shipped</option>
                                    <option disabled={order?.status?.find(s => s.message === "Order Completed")} value="Order Completed">Order Completed</option>
                                </select>
                            </div>

                            <div className='mt-3'>
                                <label className="block text-sm mb-1 font-medium" htmlFor="delivery date">Expected Delivery</label>
                                <input className="w-full p-3 border border-[#232327] cursor-pointer" type="date" name="exp_deliver" id="exp_deliver" defaultValue={order.exp_deliver} required />

                            </div>

                            <button type="submit" className="w-full bg-[#232327] p-3 text-white mt-5">Update</button>


                        </form>
                    </div>





                </div>
            </dialog>


        }




    </>




};

export default UpdateOrderModal;


