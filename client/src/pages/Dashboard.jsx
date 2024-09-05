import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/AuthProvider"
import useGetDataPublic from "../hooks/useGetPublic";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Modal from "../components/Modal";
import { FaRegCopy } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';


const Dashboard = () => {

    const navigate = useNavigate()

    const { user, logOut } = useContext(UserContext);

    //States
    const [modalId, setModalId] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    //Fetch store id
    const { data: storeId, refetch: refetchStoreId, isLoading: isStoreIdLoading } = useGetDataPublic(["store", user?.email,], `/store?admin=${user?.email}`);

    //Fetch order data
    const { data: orders, refetch: refetchOrders, isLoading: isOrderDataLoading } = useGetDataPublic(["orders", user?.email], `/orders?storeId=${storeId}`);

    //Refetch orders after getting store id
    useEffect(() => {
        refetchOrders();
    }, [storeId, refetchOrders])

    console.log(orders)

    const handleLogOut = () => {
        Swal.fire({
            title: "Logout",
            text: "Are you sure want to Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        navigate("/")
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            text: "You have been successfully logged out.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })

            }
        });
    }


    //Handle Store Id copy
    const handleStoreIdCopy = () => {
        navigator.clipboard.writeText(storeId)
            .then(() => {
                toast.success("Copied to Clipboard!");
            })
    }



    return <div className="max-w-7xl mx-auto px-5">
        {/* Top Header */}
        <div className="mt-5 flex justify-between items-center border-b pb-3">
            <h3 className="text-4xl font-semibold">Manage Orders</h3>

            <div className="flex items-center gap-5">

                {
                    storeId && <button onClick={handleStoreIdCopy} className="flex items-center gap-1 text-sm bg-[#232327] text-white font-medium px-4 py-2">Copy Store ID <span><FaRegCopy /></span></button>
                }

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User"
                                src="user.png" />
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-52 p-3 shadow-md">

                        {
                            user?.displayName && <p className="font-semibold mb-1">Name: {user?.displayName}</p>
                        }
                        <p className="font-semibold mb-4">{user?.email}</p>

                        <button onClick={handleLogOut} className="p-2 text-white font-medium bg-red-600">Logout</button>

                    </div>


                </div>

                <Toaster />

            </div>
        </div>

        {/* Store creation popup */}
        {
            isStoreIdLoading ? '' : !storeId ? <div className=" h-[80vh] flex flex-col justify-center items-center">
                <p className="font-semibold text-xl text-[#232327] mb-5">Create a store to get started ! </p>
                <button className="bg-[#232327] text-white px-6 py-3 hover:opacity-95" onClick={() => {
                    setModalId("Store-creating-Modal-1")
                    setIsModalVisible(true);
                    document.getElementById(modalId).showModal()
                }
                }>Create Store</button>
                <Modal modalID={modalId} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} refetchStoreId={refetchStoreId} />
            </div> : ''
        }



    </div>

}

export default Dashboard