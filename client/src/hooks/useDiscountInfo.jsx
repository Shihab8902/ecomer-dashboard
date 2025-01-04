import { useContext, useEffect } from "react"
import { UserContext } from "../context/AuthProvider"
import useGetDataPublic from "./useGetPublic";
import useStoreInfo from "./useStoreInfo";



const useDiscountInfo = ({ currentStore }) => {

    const { user } = useContext(UserContext);
    const { currentStore: defaultStore } = useStoreInfo();

    const { data: discounts, refetch: refetchDiscounts, isLoading: discountsLoading } = useGetDataPublic([user?.email, "discounts"], `/discountCodes?storeId=${currentStore?.storeId || defaultStore?.storeId}`);

    useEffect(() => {
        if (discounts?.length <= 0)
            refetchDiscounts();
    }, [discounts, refetchDiscounts]);

    useEffect(() => {
        refetchDiscounts();
    }, [refetchDiscounts])


    return { discounts, refetchDiscounts, discountsLoading }
}

export default useDiscountInfo