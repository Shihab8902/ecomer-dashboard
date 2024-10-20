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
import Store from "../components/Store";
import LoaderSpinner from "../components/LoaderSpinner";
import CreateStore from "../components/CreateStore";
import useStoreInfo from "../hooks/useStoreInfo";



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
    const { storeLoading, currentStore } = useStoreInfo();

    //Fetch order data



    //Refetch orders after getting store id






    {/* Conditional render store creation  */ }

    if (!currentStore?.storeId) {
        return <main >

            {
                storeLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : !currentStore?.storeId && <CreateStore />

            }
        </main>
    }




    {/* Conditional render order information */ }
    if (currentStore?.storeId) {
        return <main >

            {
                // ordersLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : currentStore?.storeId && <OrderTable />
                currentStore?.storeId && <OrderTable />
            }
        </main>
    }



























    // return <div className="max-w-7xl mx-auto px-5">
    //     {/* Top Header */}
    //     <div className="mt-6 flex justify-between items-center border-b pb-6">
    //         <h3 className="text-[32px] text-[#232327] font-semibold">Manage Orders</h3>

    //         <div className="flex items-center gap-12 ">

    //             {
    //                 store?.storeId && <button onClick={() => {
    //                     setSecondModalId("Store-Manage-Modal-1")
    //                     setIsSecondModalVisible(true);
    //                     document.getElementById(secondModalId).showModal()
    //                 }} className="flex items-center gap-1 text-base bg-[#232327] text-white font-semibold px-6 py-3"><VscSettings className="text-2xl" /> Manage Store</button>
    //             }
    //             <ManageStoreModal store={store} refetch={refetchStoreId} isModalVisible={isSecondModalVisible} modalID={secondModalId} setIsModalVisible={setIsSecondModalVisible} />


    //             <Store />


    //         </div>
    //     </div>


    //     {/* Store creation popup */}
    //     {
    //         isStoreIdLoading ? '' : !store?.storeId ? <div className=" h-[80vh] flex flex-col justify-center items-center">
    //             <p className="font-semibold text-xl text-[#232327] mb-5">Create a store to get started ! </p>
    //             <button className="bg-[#232327] text-white px-6 py-3 hover:opacity-95" onClick={() => {
    //                 setModalId("Store-creating-Modal-1")
    //                 setIsModalVisible(true);
    //                 document.getElementById(modalId).showModal()
    //             }
    //             }>Create Store</button>
    //             <Modal modalID={modalId} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} refetchStoreId={refetchStoreId} />
    //         </div> : ''
    //     }

    //     {
    //         store?.storeId && <div className=" bg-[#FDFDFF] p-8 h-fit mt-10 border border-[#EBEBEE]">
    //             {/* Filter */}

    //             <div className="flex justify-between ">
    //                 <h3 className="text-[#232327] text-[20px] leading-[30px] font-semibold ">Recent Orders</h3>
    //                 <div className="max-w-64 ">

    //                     <select onChange={(e) => {
    //                         setFilterValue(e.target.value)
    //                     }
    //                     } name="filter" defaultValue="" id="filter" className="w-full cursor-pointer font-semibold bg-transparent outline-none">
    //                         <option value="" disabled>Filter By</option>
    //                         <option value="All">All</option>
    //                         <option value="Order Received" >Order Received</option>
    //                         <option value="Preparing Order">Preparing Order</option>
    //                         <option value="Order Shipped">Order Shipped</option>
    //                         <option value="Order Completed">Order Completed</option>
    //                     </select>
    //                 </div>
    //             </div>



    //             {/* Display orders */}

    //             <div className=" overflow-auto">
    //                 {
    //                     isOrderDataLoading ? <div className=" flex justify-center items-center">
    //                         <span className="loading loading-spinner loading-lg"></span>
    //                     </div> :
    //                         orders?.length > 0 ? <div>

    //                             <OrderTable orders={orders} refetch={refetchOrders} />


    //                         </div>
    //                             : <div className="text-center mt-20">
    //                                 <p className="text-2xl font-semibold text-gray-400">No order data found.</p>
    //                             </div>
    //                 }
    //             </div>

    //         </div>
    //     }



    // </div>

}

export default Dashboard