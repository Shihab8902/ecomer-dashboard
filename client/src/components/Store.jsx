import Avatar from 'react-avatar';
import useStoreInfo from '../hooks/useStoreInfo';
import { RxCaretDown } from "react-icons/rx";
import { MdOutlineSettings } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
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
                <div className="flex items-center gap-1  border p-1 rounded bg-gray-50">
                    <div className='flex items-center gap-1'>
                        <Avatar name={currentStore?.storeName} size="28" round="5px" color="#000" />
                        <p className='font-semibold'>{currentStore?.storeName}</p>
                    </div>
                    <span className='text-xl'><RxCaretDown /></span>
                </div>
            </div>
            <div
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white z-[1] mt-3 w-fit p-5 rounded-md shadow-lg">

                {/* Display stores */}
                <div className=" max-h-48 min-w-56 overflow-auto flex flex-col gap-1">
                    {
                        store && store?.map(store => {
                            return <div onClick={() => {
                                selectNewStore(store)


                            }} key={store?._id} className={`w-full flex  hover:bg-gray-100 justify-between items-center border ${currentStore === store && " bg-gray-100 cursor-default"}  cursor-pointer p-1 rounded `}>
                                <div className="flex items-center gap-1">
                                    <Avatar name={store?.storeName} size="24" round="5px" color="#000" />
                                    <p className='text-xs font-medium'>{store?.storeName}</p>
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
                <div className="mt-4">
                    <button onClick={() => navigate("/store/create")} className="flex font-medium text-sm items-center justify-center p-[6px] gap-1 w-full rounded bg-[#232327] text-white hover:bg-black"><LuPlus className='text-base font-bold' /> Create Store</button>
                </div>

                <div className="w-full h-[1px] border-b my-5"></div>

                <div className="max-w-[150px]">
                    {user?.displayName && (
                        <p className="font-bold text-sm  break-words">
                            {user?.displayName}
                        </p>
                    )}
                    <p className="text-[#6E717D] text-xs break-words">{user?.email}</p>

                </div>


                <button onClick={handleLogOut} className="py-1 w-ful text-left hover:bg-transparent mt-2 font-semibold rounded-md">
                    Logout
                </button>


            </div>
        </div>
    )
}

export default Store