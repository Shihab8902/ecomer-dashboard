import { useEffect } from "react";
import useGetDataPublic from "./useGetPublic";
import useStoreInfo from "./useStoreInfo";



const useTotalOrders = () => {
    const savedStoreId = localStorage.getItem("currentStore");
    const { currentStore } = useStoreInfo();

    // Build the API endpoint dynamically
    const storeId = savedStoreId || currentStore?._id;
    const endpoint = storeId ? `/orders/total?id=${storeId}` : null;

    const { data: totalOrders, refetch: refetchTotalOrders, isLoading: loadingTotalOrders } = useGetDataPublic(
        [storeId, "totalOrders"],
        endpoint
    );

    // Refetch when storeId changes
    useEffect(() => {
        if (storeId) {
            refetchTotalOrders();
        }
    }, [storeId, refetchTotalOrders]);

    return { totalOrders, refetchTotalOrders, loadingTotalOrders };
};

export default useTotalOrders;
