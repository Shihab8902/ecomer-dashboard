import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/AuthProvider"
import useGetDataPublic from "./useGetPublic";
import { useNavigate } from "react-router-dom";




const useStoreInfo = () => {
    const [currentStore, setCurrentStore] = useState({});

    const navigate = useNavigate();

    const getSavedStore = (stores) => {
        const savedStoreId = localStorage.getItem("currentStore");
        if (savedStoreId && stores) {
            const selectedStore = stores.find(store => store._id === savedStoreId) || stores?.[0]
            setCurrentStore(selectedStore);
            return;
        }

        setCurrentStore(stores?.[0]);

    }


    const selectNewStore = (store) => {
        localStorage.setItem("currentStore", store?._id);
        setCurrentStore(store);
        navigate("/");

    }


    const { user } = useContext(UserContext);
    const { data: store, refetch: refetchStore, isLoading: storeLoading } = useGetDataPublic([user?.email, "store"], `/store?admin=${user?.email}`);


    //Get current store
    useEffect(() => {
        getSavedStore(store);
    }, [store]);



    return { store, refetchStore, currentStore, selectNewStore, storeLoading }
}

export default useStoreInfo