import { NavLink } from "react-router-dom"
import Store from "./Store"
import useStoreInfo from "../hooks/useStoreInfo"


const TopBar = ({ title }) => {


    const { currentStore } = useStoreInfo();


    return (
        <div className="pt-6 flex justify-between items-center border-b pb-6 ">
            <h3 className="text-[32px] text-[#232327] font-semibold">{title}</h3>
            {
                currentStore?.storeId && <nav className="flex gap-6">
                    <NavLink className="font-semibold text-base hover:underline" to="/">Home</NavLink>
                    <NavLink className="font-semibold text-base hover:underline" to="/store/manage">Settings</NavLink>
                    <NavLink className="font-semibold text-base hover:underline" to="/store/manage">Payments</NavLink>
                </nav>
            }
            <Store />
        </div>
    )
}

export default TopBar