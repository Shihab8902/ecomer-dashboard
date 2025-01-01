import { useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useStoreInfo from '../hooks/useStoreInfo';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { MdContentCopy } from 'react-icons/md';
import BottomBar from '../components/BottomBar';
import { GoArrowUpRight } from 'react-icons/go';





const ManageStore = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { refetchStore, currentStore, store, selectNewStore } = useStoreInfo();



    const [isStoreUpdating, setIsStoreUpdating] = useState(false);
    const [location, setLocation] = useState(currentStore?.location);

    //Handle Store Id copy
    const handleStoreIdCopy = () => {
        navigator.clipboard.writeText(currentStore?.storeId)
            .then(() => {
                Swal.fire({
                    text: "Copied to clipboard",
                    showConfirmButton: false,
                    timer: 1500,
                    icon: "success"
                })
            })
    }


    //Set location value
    useEffect(() => {
        setLocation(currentStore?.location);
    }, [currentStore]);





    //Handle store update
    const handleFormSubmit = e => {
        e.preventDefault();
        setIsStoreUpdating(true)
        const storeName = e.target.storeName.value;
        const storeCurrency = e.target.storeCurrency.value;

        axiosPublic.put(`/store?id=${currentStore?._id}`, { storeName, location, storeCurrency })
            .then(res => {
                if (res.data) {
                    refetchStore();
                    setIsStoreUpdating(false);
                    navigate("/");
                    Swal.fire({
                        text: "Store updated successfully",
                        showConfirmButton: false,
                        timer: 1500,
                        icon: "success"
                    })

                }
            }).catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                })
                setIsStoreUpdating(false);
            })
    }


    //Store delete
    const handleStoreDelete = () => {
        Swal.fire({
            title: "Delete Store?",
            html: `<span>Are you sure you want to delete this store? This action is irreversible and will permanently delete all store data, including orders.</span> <br /> Type <strong>${currentStore?.storeName}</strong> below to confirm.`,
            icon: "warning",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Confirm"
        })
            .then(res => {
                if (res.value === currentStore?.storeName) {
                    axiosPublic.delete(`/store?storeId=${currentStore?.storeId}`)
                        .then(res => {
                            if (res.data === "success") {
                                Swal.fire({
                                    icon: "success",
                                    text: "The store has been successfully deleted.",
                                    timer: 1500,
                                    showConfirmButton: false
                                })
                                selectNewStore(store[0]);
                                navigate("/")

                            }

                        })
                } else {
                    Swal.fire({
                        title: "Failed!",
                        text: "Store name is incorrect.",
                        icon: "error"
                    })
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                })
            })
    }

    function formatText(text) {
        if (text) {
            const firstPart = text.slice(0, 9);
            const middle = "********";
            const lastPart = text.slice(-6);

            return `${firstPart}${middle}${lastPart}`;
        }
    }


    //Country selection
    const options = useMemo(() => countryList().getData(), [])
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: "42px",
            borderRadius: "0.25rem",
            borderColor: state.isFocused ? "#e5e7eb" : "#d1d5db",
            boxShadow: state.isFocused ? "0 0 0 1px rgba(209, 213, 219, 0.5)" : "none",
            "&:hover": {
                borderColor: "#d1d5db",
            },
        }),
        valueContainer: (provided) => ({
            ...provided,
            height: "50px",
            padding: "0 1rem",
            background: "#F6F6F6"
        }),
        input: (provided) => ({
            ...provided,
            margin: "0px",
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: "50px",
            background: "#F6F6F6"

        }),
    };


    return (
        <main >
            <TopBar title="Manage Store" />

            <div className='min-h-screen max-w-7xl mx-auto flex justify-center items-center px-5 pt-28 pb-28 md:pb-5'>

                <form onSubmit={handleFormSubmit} className="max-w-[600px] w-full bg-white px-4 py-6 md:p-10 rounded-lg" >
                    <div>
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="name">Store ID</label>
                        <div className="p-3 bg-[#FFEFAF] flex items-center justify-between w-full rounded-[4px]">
                            <p className="text-sm text-[#232327] font-medium">{formatText(currentStore?.storeId)}</p> <span onClick={handleStoreIdCopy} className="text-[22px] text-[#232327] cursor-pointer" ><MdContentCopy /></span>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="name">Store Name</label>
                        <input defaultValue={currentStore?.storeName} className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]  " type="text" name="storeName" id="storeName" placeholder="Enter store name" required />
                    </div>

                    <div className='mt-2'>
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="location">Business Location</label>
                        <Select styles={customStyles} options={options} defaultValue={location} className='cursor-pointer rounded-md  outline-gray-300 focus:border-gray-300' value={location} onChange={(value) => setLocation(value)} />
                    </div>

                    <div className='mt-2'>
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="storeCurrency">Store Currency</label>
                        <input defaultValue={currentStore?.storeCurrency} className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969] " type="text" name="storeCurrency" id="storeCurrency" placeholder="Enter store currency" required />
                    </div>

                    <div className='mt-2'>
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="storeCurrency">Email Templates</label>
                        <div className='py-[14px] px-3 bg-[#F6F6F6] rounded'>
                            <Link to="/store/manage/emailTemplates/customer" className='text-[#232327] text-base leading-[150%] w-full pb-3 flex justify-between items-center border-b border-[#0000001A]'>Customer template <GoArrowUpRight className='text-xl' /> </Link>
                            <Link to="/store/manage/emailTemplates/owner" className='text-[#232327] text-base leading-[150%] w-full flex justify-between items-center pt-3'>Owner template <GoArrowUpRight className='text-xl' /> </Link>
                        </div>
                    </div>


                    <div className="mt-5 flex gap-3 w-full justify-end">
                        <button onClick={handleStoreDelete} type="button" className="py-3 px-5  focus:bg-[#E93725]  bg-[#E93725]  hover:bg-red-600 text-base font-medium rounded-[4px] text-white  flex items-center justify-center gap-2 ">
                            Delete store
                        </button>

                        <button type="submit" disabled={isStoreUpdating} className="py-3 px-5  focus:bg-[#232327] disabled:bg-[#232327] bg-[#232327]  hover:bg-black text-base font-medium  rounded-[4px] text-white  flex items-center justify-center gap-2 ">
                            Update
                        </button>

                    </div>

                </form>

            </div>
            <div className='md:hidden'>
                <BottomBar />
            </div>

        </main>       
    )

}


export default ManageStore