import Avatar from 'react-avatar';
import useStoreInfo from '../hooks/useStoreInfo';
import { MdOutlineSettings } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { LuPlus } from 'react-icons/lu';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import useOrderInfo from '../hooks/useOrderInfo';



const Store = () => {

    const navigate = useNavigate();
    const { user, logOut } = useContext(UserContext);

    const { currentStore, store, selectNewStore } = useStoreInfo();
    const { refetchOrders } = useOrderInfo({ filter: "All", currentStore: currentStore });


    //Refetch store items
    useEffect(() => {
        refetchOrders();
    }, [currentStore, refetchOrders])

    //Handle logout
    const handleLogOut = () => {
        Swal.fire({
            title: "Logout?",
            text: "Are you sure want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            text: "You've successfully logged out.",
                            timer: 1500,
                            showConfirmButton: false,
                            icon: "success"

                        });
                        navigate("/");
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: error.message,
                            icon: "error"
                        })
                    })
            }
        });

    }

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className='btn btn-ghost hover:bg-transparent'>
                <div className='hidden md:block'>
                    <Avatar name={currentStore?.storeName} size="40" round="8px" color="#232327" />
                </div>

                <div className='md:hidden'>
                    <Avatar name={currentStore?.storeName} size="30" round="8px" color="#232327" />
                </div>
            </div>
            <div
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white z-[1] mt-3 w-fit p-5 rounded-md shadow-lg">

                {/* Display stores */}
                <div className=" max-h-48 min-w-56 overflow-auto flex flex-col gap-1">
                    <p className="text-sm font-medium text-[#696969]  leading-[18px] mb-2">Stores</p>
                    {
                        store && store?.map(store => {
                            return <div onClick={() => {
                                selectNewStore(store)


                            }} key={store?._id} className={`w-full flex  hover:bg-gray-100 justify-between items-center border ${currentStore === store && " bg-gray-100 cursor-default"}  cursor-pointer p-1 rounded `}>
                                <div className="flex items-center gap-1">
                                    <Avatar name={store?.storeName} size="30" round="8px" color="#232327" />
                                    <p className='text-xs font-medium text-[#696969]'>{store?.storeName}</p>
                                </div>
                                {
                                    currentStore === store && <span className="text-xl cursor-pointer" onClick={(e) => {
                                        e.stopPropagation();
                                        navigate("/store/manage");
                                    }}>
                                        <MdOutlineSettings />
                                    </span>
                                }
                            </div>
                        })
                    }
                </div>

                {/* New store create button */}
                <div className="mt-3">
                    <button onClick={() => navigate("/store/create")} className="w-full py-[6px] h-fit hover:bg-white flex items-center justify-center text-xs gap-1 rounded-[4px] create-button font-medium text-[#232327] border border-[#000] leading-[150%]"><LuPlus className='text-base font-bold' /> Create Store</button>
                </div>

                <div className="w-full h-[1px] border-b mt-5"></div>

                <div className="max-w-[150px] mt-3">
                    {user?.displayName && (
                        <p className="font-medium text-sm text-[#232327] leading-[140%]  break-words">
                            {user?.displayName}
                        </p>
                    )}
                    <p className="text-[#696969] leading-[140%] text-xs break-words">{user?.email}</p>

                </div>


                <button onClick={handleLogOut} className="py-1 w-full text-left hover:bg-transparent mt-2 text-sm font-medium text-[#E93725]  rounded-md">
                    Logout
                </button>


            </div>
        </div>
    )
}

export default Store