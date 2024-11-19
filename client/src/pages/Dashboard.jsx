import LoaderSpinner from "../components/LoaderSpinner";
import useStoreInfo from "../hooks/useStoreInfo";
import useTotalOrders from "../hooks/useTotalOrders";
import Documentation from "./Documentation";
import InitialStoreCreate from "./InitialStoreCreate";
import { Navigate } from "react-router-dom";



const Dashboard = () => {

    //Fetch store id
    const { storeLoading, currentStore } = useStoreInfo();
    const { totalOrders, loadingTotalOrders } = useTotalOrders();

    // Conditional render for store creation or redirect
    if (!currentStore?.storeId) {
        return (
            <main>
                {storeLoading ? (
                    <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" />
                ) : (
                    <InitialStoreCreate />
                )}
            </main>
        );
    }


    // Ensure totalOrders is fully loaded
    if (loadingTotalOrders || !totalOrders) {
        return <LoaderSpinner />;
    }
    if (totalOrders?.total > 0) {
        return <Navigate to="/orders" />
    }


    // Redirect to home if no specific conditions are met
    return <Documentation />




}

export default Dashboard