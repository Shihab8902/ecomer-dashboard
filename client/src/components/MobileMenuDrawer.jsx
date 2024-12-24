import { IoMdAddCircleOutline } from "react-icons/io"
import { MdOutlinePayment } from "react-icons/md"
import { RiFileList2Line } from "react-icons/ri"
import { NavLink } from "react-router-dom"


const MobileMenuDrawer = () => {
    return (
        <div className="drawer drawer-end inline">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <button><label htmlFor="my-drawer-4" className="flex items-center font-normal text-xs leading-[160%] opacity-60 flex-col cursor-pointer" > < IoMdAddCircleOutline className="text-2xl" /> More</label></button>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 py-6 px-3">
                    {/* Sidebar content here */}
                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-[#696969] font-normal text-sm leading-[150%]">Other Options</p>
                        <label htmlFor="my-drawer-4" className="text-[#696969] text-base pr-3">X</label>
                    </div>

                    {/* Links */}
                    <div className="mt-1">
                        <NavLink className="flex items-center gap-1 text-[#232327] text-base font-medium leading-[140%]" to="/payment"> < MdOutlinePayment className="text-[28px] text-[#696969]" /> Payment</NavLink>
                        <NavLink className="flex mt-3 items-center gap-1 text-[#232327] text-base font-medium leading-[140%]" to="/docs"> < RiFileList2Line className="text-2xl text-[#696969]" /> Docs</NavLink>
                    </div>

                </ul>
            </div>
        </div>
    )
}

export default MobileMenuDrawer