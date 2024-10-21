

import OrderTable from "../components/OrderTable";

import LoaderSpinner from "../components/LoaderSpinner";
import CreateStore from "../components/CreateStore";
import useStoreInfo from "../hooks/useStoreInfo";
import useOrderInfo from "../hooks/useOrderInfo";



const Dashboard = () => {

    //Fetch store id
    const { storeLoading, currentStore } = useStoreInfo();
    const { ordersLoading } = useOrderInfo({ filter: "All", currentStore: currentStore });






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
                ordersLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : currentStore?.storeId && <OrderTable />
            }
        </main>
    }



}

export default Dashboard