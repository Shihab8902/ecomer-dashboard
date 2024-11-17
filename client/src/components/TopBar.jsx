import { NavLink } from "react-router-dom"
import Store from "./Store"
import useStoreInfo from "../hooks/useStoreInfo"


const TopBar = ({ title }) => {


    const { currentStore } = useStoreInfo();


    return (
        <div className=" max-w-7xl mx-auto px-5 flex justify-between items-center fixed top-0 w-full py-6 bg-white ">
            <h3 className="text-[32px] text-[#232327] font-semibold">{title}</h3>
            {
                currentStore?.storeId && <nav className="flex gap-6">
                    <NavLink className="font-semibold text-base hover:underline" to="/">Home</NavLink>
                    <NavLink className="font-semibold text-base hover:underline" to="/store/manage">Settings</NavLink>
                    <NavLink className="font-semibold text-base hover:underline" to="/payments">Payments</NavLink>
                </nav>
            }
            <Store />
        </div>
    )
}

export default TopBar