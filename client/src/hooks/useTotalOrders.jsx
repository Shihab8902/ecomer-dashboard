import { useEffect } from "react";
import useGetDataPublic from "./useGetPublic";



const useTotalOrders = () => {
    const savedStoreId = localStorage.getItem("currentStore");

    const { data: totalOrders, refetch: refetchTotalOrders, isLoading: loadingTotalOrders } = useGetDataPublic([savedStoreId, "totalOrders"], `/orders/total?id=${savedStoreId}`);

    //Refetch
    useEffect(() => {
        refetchTotalOrders();
    }, [savedStoreId, refetchTotalOrders]);



    return { totalOrders, refetchTotalOrders, loadingTotalOrders };

}

export default useTotalOrders