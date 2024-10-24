import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import UpdateOrderModal from "./UpdateOrderModal";
import { RxCaretDown } from "react-icons/rx";
import { RxCaretUp } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import moment from 'moment';
import useOrderInfo from "../hooks/useOrderInfo";
import useStoreInfo from "../hooks/useStoreInfo";
import TopBar from "./TopBar";
import LoaderSpinner from "./LoaderSpinner";

const OrderTable = () => {
    const [modalId, setModalId] = useState('update-order-Modal-1');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [openOrders, setOpenOrders] = useState({});
    const [selectedOrder, setSelectedOrder] = useState({});
    const [filterValue, setFilterValue] = useState("All");

    const { currentStore } = useStoreInfo();
    const { orders, ordersLoading, refetchOrders } = useOrderInfo({ filter: filterValue, currentStore: currentStore });

    // Fetch orders only when currentStore is available
    useEffect(() => {
        if (currentStore) {
            refetchOrders();
        }
    }, [currentStore, refetchOrders]);


    const formatDate = (dateString) => {
        if (dateString === "unknown") {
            return "unknown";

        }

        const date = moment(dateString);
        return date.format('Do MMMM YYYY');
    };


    // Toggle function for the accordion
    const toggleAccordion = (index) => {
        setOpenOrders((prevState) => ({
            ...prevState,
            [index]: !prevState[index], // Toggle the specific index
        }));
    };

    return (
        <div className="max-w-7xl mx-auto px-5 ">
            {/* Top Bar */}
            <TopBar title="Recent Orders" />


            {/* Filter */}
            <div className="flex justify-end mt-8 ">
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

            {/* Display order table */}
            {
                ordersLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : orders?.length < 1 ? <h3 className="text-center font-semibold text-xl mt-20 text-gray-600">No order data found!</h3> :
                    <div className="overflow-x-auto mt-10 ">
                        <table className="table w-full">
                            {/* Table head */}
                            <thead>
                                <tr className="border-b border-b-[#CED3DD]" >
                                    <th className="text-center text-[#232327] text-sm font-semibold leading-5">Sl.</th>
                                    <th className="text-center text-[#232327] text-sm font-semibold leading-5">Order</th>
                                    <th className="text-center text-[#232327] text-sm font-semibold leading-5">Date</th>
                                    <th className="text-center text-[#232327] text-sm font-semibold leading-5">Fulfillment Status</th>
                                    <th className="text-center text-[#232327] text-sm font-semibold leading-5">Expected Delivery</th>
                                    <th className="text-center text-[#232327] text-sm font-semibold leading-5">Payment Method</th>
                                    <th className="text-center text-[#232327] text-sm font-semibold leading-5">Subtotal</th>
                                    <th className="text-center text-[#232327] text-sm font-semibold leading-5">Edit Order</th>
                                </tr>
                            </thead>

                            {/* Table body */}
                            <tbody>
                                {orders?.map((order, index) => {
                                    const isOpen = openOrders[index] || false; // Get the open state for each order



                                    return (
                                        <React.Fragment key={index}>
                                            {/* Table row as accordion title */}
                                            <tr className="cursor-pointer hover:bg-[#F4F4FC]" onClick={() => toggleAccordion(index)}>
                                                <td className="text-center text-base leading-6 font-medium text-[#6E717D]">{index + 1}</td>
                                                <td className="text-center text-base leading-6 font-medium text-[#6E717D]">{order.orderNumber}</td>
                                                <td className="text-center text-base leading-6 font-medium text-[#6E717D]">{order.orderedAt}</td>
                                                <td style={{ color: order.status.map(status => status.message)[order.status.length - 1] === "Order Received" ? "#28A745" : order.status.map(status => status.message)[order.status.length - 1] === "Preparing Order" ? "#007BFF" : order.status.map(status => status.message)[order.status.length - 1] === "Order Shipped" ? "#ED8C05" : order.status.map(status => status.message)[order.status.length - 1] === "Order Completed" ? "#1FAC64" : "#6E717D" }} className={`text-center text-base leading-6 font-medium `}>{
                                                    order.status.map(status => status.message)[order.status.length - 1]
                                                }</td>
                                                <td className="text-center text-base leading-6 font-medium text-[#6E717D]">
                                                    {formatDate(order.exp_deliver)}
                                                </td>
                                                <td className="text-center text-base leading-6 font-medium text-[#6E717D]">{order?.paymentMethod}</td>
                                                <td className="text-center text-base leading-6 font-medium text-[#6E717D]">{currentStore?.storeCurrency}{(order.subtotal / 100).toFixed(2)}</td>

                                                {/* Edit order button */}
                                                <td className="text-center  flex justify-center"><button onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedOrder(order);
                                                    setIsModalVisible(true);
                                                    document.getElementById(modalId)?.showModal();
                                                }} className="text-lg border p-2 bg-gray-100 text-[#1FAC64]"><FaRegEdit /></button></td>
                                                <td className="text-base leading-6 font-medium text-[#6E717D]">Details {isOpen ? <RxCaretUp className="text-lg inline" /> : <RxCaretDown className="text-lg inline" />}</td>
                                            </tr>

                                            {/* Accordion content */}

                                            <tr className="bg-gray-100 ">
                                                <td colSpan="9" className="p-0">
                                                    <div className={`${isOpen ? "max-h-[1000px]" : " max-h-[1px]"} overflow-hidden transition-all ease-in-out duration-500`}>
                                                        <div className="p-6 bg-white border border-[#EBEBEE]">
                                                            {/* Heading */}
                                                            <div className="flex justify-between items-center">
                                                                <h3 className="text-[#232327] font-semibold leading-7 text-lg">Order {order.orderNumber}</h3>

                                                            </div>

                                                            {/* Shipping Details */}
                                                            <div className="mt-4 flex flex-col gap-3">
                                                                <h4 className="text-[#232327] font-semibold leading-6 text-base">Shipping Information: </h4>
                                                                <ul>
                                                                    <li className="text-sm font-semibold text-[#232327] leading-5">Name: <span className="text-[#6E717D] font-medium">{order.shipping_details.name}</span></li>
                                                                    <li className="text-sm font-semibold text-[#232327] leading-5">Email: <span className="text-[#6E717D] font-medium">{order.shipping_details.email}</span></li>
                                                                    <li className="text-sm font-semibold text-[#232327] leading-5 flex items-center gap-1">Address:
                                                                        <ul className="flex items-center gap-1">
                                                                            {
                                                                                Object.entries(order?.shipping_details?.address || {})
                                                                                    .filter(([key, _]) => key !== 'additionalData')
                                                                                    .map(([key, value], index, array) => (
                                                                                        <li key={index} className="text-sm font-semibold text-[#232327] leading-5">
                                                                                            {key}: <span className="text-[#6E717D] font-medium">
                                                                                                {
                                                                                                    typeof value === 'object' && value !== null
                                                                                                        ? JSON.stringify(value)
                                                                                                        : value
                                                                                                }
                                                                                            </span>
                                                                                            {index !== array.length - 1 && ', '}
                                                                                        </li>
                                                                                    ))
                                                                            }


                                                                        </ul>

                                                                    </li>
                                                                    <li className="text-sm font-semibold text-[#232327] flex items-center gap-1">
                                                                        Additional:
                                                                        {
                                                                            order?.shipping_details?.address?.additionalData
                                                                                ?.map((data, index) => {
                                                                                    const [key, value] = Object.entries(data)[0];
                                                                                    return (
                                                                                        <span key={index} className="text-sm font-semibold text-[#232327]">
                                                                                            {key}: <span className="text-[#6E717D] font-medium">{value}</span>
                                                                                            {index !== order?.shipping_details?.address?.additionalData.length - 1 && ', '}
                                                                                        </span>
                                                                                    );
                                                                                })
                                                                        }
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            {/* Product Details */}
                                                            <div className="mt-3 flex flex-col gap-4 ">
                                                                <h4 className="text-[#232327] font-semibold leading-6 text-base">Order Summary: </h4>
                                                                <div className="flex flex-col gap-3">
                                                                    {order.products?.map(product => (
                                                                        <OrderCard key={product.uid} product={product} currency={currentStore?.storeCurrency} />
                                                                    ))}
                                                                </div>
                                                                {/* Divider */}
                                                                <div className="w-full mt-3 h-[1px] bg-[#232327]"></div>

                                                                {/* Subtotal */}
                                                                <div className="mt-1 flex justify-between items-center">
                                                                    <h5 className="text-[#232327] font-bold leading-6 text-base">Subtotal: </h5>
                                                                    <p className="text-[#232327] font-bold leading-6 text-base">{currentStore?.storeCurrency}{(order?.subtotal / 100).toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </td>
                                            </tr>

                                        </React.Fragment>
                                    );
                                })}
                                {/* Modal for updating the order */}
                                <UpdateOrderModal
                                    refetch={refetchOrders}
                                    modalID={modalId}
                                    isModalVisible={isModalVisible}
                                    setIsModalVisible={setIsModalVisible}
                                    order={selectedOrder}
                                />
                            </tbody>
                        </table>
                    </div>
            }



        </div>
    );
};

export default OrderTable;
