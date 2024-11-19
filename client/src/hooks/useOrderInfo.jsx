import { useContext, useEffect } from "react"
import { UserContext } from "../context/AuthProvider"
import useGetDataPublic from "./useGetPublic";
import useStoreInfo from "./useStoreInfo";



const useOrderInfo = ({ search, currentStore }) => {

    const { user } = useContext(UserContext);
    const { currentStore: defaultStore } = useStoreInfo();

    const { data: orders, refetch: refetchOrders, isLoading: ordersLoading } = useGetDataPublic([user?.email, "orders"], `/orders?storeId=${currentStore?.storeId || defaultStore?.storeId}&search=${search || ''}`);

    useEffect(() => {
        refetchOrders();
    }, [search, refetchOrders])


    return { orders, refetchOrders, ordersLoading }
}

export default useOrderInfo