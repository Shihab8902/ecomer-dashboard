import { useEffect } from "react"
import useGetDataPublic from "./useGetPublic";
import useStoreInfo from "./useStoreInfo";



const useOrderInfo = ({ search, currentStore }) => {

    const { currentStore: defaultStore } = useStoreInfo();

    const { data: orders, refetch: refetchOrders, isLoading: ordersLoading } = useGetDataPublic([currentStore?.storeId, "orders"], `/orders?storeId=${currentStore?.storeId || defaultStore?.storeId}&search=${search || ''}`);

    useEffect(() => {
        refetchOrders();
    }, [search, refetchOrders])


    return { orders, refetchOrders, ordersLoading }
}

export default useOrderInfo