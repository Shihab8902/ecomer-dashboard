import LoaderSpinner from "../components/LoaderSpinner";
import useStoreInfo from "../hooks/useStoreInfo";
import useTotalOrders from "../hooks/useTotalOrders";
import InitialStoreCreate from "./InitialStoreCreate";
import { Navigate } from "react-router-dom";



const Dashboard = () => {

    //Fetch store id
    const { storeLoading, currentStore } = useStoreInfo();
    const { totalOrders } = useTotalOrders();


    {/* Conditional render store creation  */ }


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

    // Redirect to "/orders" if there are orders
    if (totalOrders?.total > 0) {
        return <Navigate to="/orders" />
    }



    // Redirect to home if no specific conditions are met
    return <Navigate to="/" />




}

export default Dashboard