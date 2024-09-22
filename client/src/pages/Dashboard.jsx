import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/AuthProvider"
import useGetDataPublic from "../hooks/useGetPublic";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Modal from "../components/Modal";

import OrderTable from "../components/OrderTable";
import ManageStoreModal from "../components/ManageStoreModal";
import { VscSettings } from "react-icons/vsc";
import { LuUserCircle2 } from "react-icons/lu";



const Dashboard = () => {

    const navigate = useNavigate()

    const { user, logOut } = useContext(UserContext);

    //States
    const [modalId, setModalId] = useState('');
    const [secondModalId, setSecondModalId] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
    const [filterValue, setFilterValue] = useState("All");



    //Fetch store id
    const { data: store, refetch: refetchStoreId, isLoading: isStoreIdLoading } = useGetDataPublic(["store", user?.email,], `/store?admin=${user?.email}`);

    //Fetch order data
    const { data: orders, refetch: refetchOrders, isLoading: isOrderDataLoading } = useGetDataPublic(["orders", user?.email], `/orders?storeId=${store?.storeId}&filter=${filterValue}`);


    //Refetch orders after getting store id
    useEffect(() => {
        refetchOrders();
    }, [store, refetchOrders, filterValue, orders])



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



    return <div className="max-w-7xl mx-auto px-5">
        {/* Top Header */}
        <div className="mt-6 flex justify-between items-center border-b pb-6">
            <h3 className="text-[32px] text-[#232327] font-semibold">Manage Orders</h3>

            <div className="flex items-center gap-12 ">

                {
                    store?.storeId && <button onClick={() => {
                        setSecondModalId("Store-Manage-Modal-1")
                        setIsSecondModalVisible(true);
                        document.getElementById(secondModalId).showModal()
                    }} className="flex items-center gap-1 text-base bg-[#232327] text-white font-semibold px-6 py-3"><VscSettings className="text-2xl" /> Manage Store</button>
                }
                <ManageStoreModal store={store} refetch={refetchStoreId} isModalVisible={isSecondModalVisible} modalID={secondModalId} setIsModalVisible={setIsSecondModalVisible} />

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-12 rounded-full">
                            <img
                                alt="User"
                                src="user.png" />
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white z-[1] mt-3 w-fit p-3 shadow-lg">

                        <div className="flex items-center gap-3">
                            <LuUserCircle2 className="text-[40px]" />
                            <div>
                                {
                                    user?.displayName && <p className="font-bold  text-sm text-[#232327] ">Name: {user?.displayName}</p>
                                }
                                <p className="text-[#6E717D] text-sm ">{user?.email}</p>
                            </div>
                        </div>

                        <button onClick={handleLogOut} className="py-2 w-full mt-6 font-semibold  text-white leading-[24px]  bg-[#E93725] ">Logout</button>

                    </div>


                </div>



            </div>
        </div>


        {/* Store creation popup */}
        {
            isStoreIdLoading ? '' : !store?.storeId ? <div className=" h-[80vh] flex flex-col justify-center items-center">
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

        {
            store?.storeId && <div className=" bg-[#FDFDFF] p-8 h-fit mt-10 border border-[#EBEBEE]">
                {/* Filter */}

                <div className="flex justify-between ">
                    <h3 className="text-[#232327] text-[20px] leading-[30px] font-semibold ">Recent Orders</h3>
                    <div className="max-w-64 ">

                        <select onChange={(e) => {
                            setFilterValue(e.target.value)
                        }
                        } name="filter" defaultValue="" id="filter" className="w-full cursor-pointer font-semibold bg-transparent outline-none">
                            <option value="" disabled>Filter By</option>
                            <option value="All">All</option>
                            <option value="Order Received" >Order Received</option>
                            <option value="Preparing Order">Preparing Order</option>
                            <option value="Order Shipped">Order Shipped</option>
                            <option value="Order Completed">Order Completed</option>
                        </select>
                    </div>
                </div>



                {/* Display orders */}

                <div className=" overflow-auto">
                    {
                        isOrderDataLoading ? <div className=" flex justify-center items-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div> :
                            orders?.length > 0 ? <div>

                                <OrderTable orders={orders} refetch={refetchOrders} />


                            </div>
                                : <div className="text-center mt-20">
                                    <p className="text-2xl font-semibold text-gray-400">No order data found.</p>
                                </div>
                    }
                </div>

            </div>
        }



    </div>

}

export default Dashboard