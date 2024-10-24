import { useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useStoreInfo from '../hooks/useStoreInfo';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import LoaderSpinner from '../components/LoaderSpinner';
import { FaCopy } from 'react-icons/fa';

const ManageStore = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { refetchStore, currentStore } = useStoreInfo();


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
            height: "42px",
            padding: "0 1rem",
        }),
        input: (provided) => ({
            ...provided,
            margin: "0px",
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: "42px",
        }),
    };


    return (
        <div className='max-w-7xl mx-auto px-5'>
            <TopBar title="Manage Store" />

            <div className='h-[80vh] flex justify-center flex-col items-center'>

                {/* Store id */}
                <div className="mt-3 max-w-[400px] md:min-w-[400px] mx-auto bg-[#FDFDFF] py-3 px-5 mb-10 border border-[#EBEBEE]">
                    <label className="block text-base mb-1  text-[#232327]" htmlFor="storeId">Store ID</label>
                    <div className="w-full rounded p-3 mb-2 border text-xs flex justify-between items-center border-[#D3D3D4] ">
                        {currentStore?.storeId} <span onClick={handleStoreIdCopy} title='Copy Store ID' className='cursor-pointer'><FaCopy /></span>
                    </div>
                </div>

                <form onSubmit={handleFormSubmit} className="max-w-[400px] md:min-w-[400px] bg-[#FDFDFF] p-8 border border-[#EBEBEE]" >
                    <div>
                        <label className="block text-base mb-1  text-[#232327]" htmlFor="name">Store Name</label>
                        <input defaultValue={currentStore?.storeName} className="w-full px-4 py-[10px] outline-gray-300 rounded border placeholder:text-[#A9A9B7] border-[#D3D3D4] " type="text" name="storeName" id="storeName" placeholder="Enter store name" required />
                    </div>

                    <div className='mt-3'>
                        <label className="block text-base mb-1  text-[#232327]" htmlFor="location">Where is the business located?</label>
                        <Select styles={customStyles} options={options} defaultValue={location} className='cursor-pointer rounded-md  outline-gray-300 focus:border-gray-300' value={location} onChange={(value) => setLocation(value)} />
                    </div>

                    <div className='mt-3'>
                        <label className="block text-base mb-1  text-[#232327]" htmlFor="storeCurrency">Store Currency</label>
                        <input defaultValue={currentStore?.storeCurrency} className="w-full px-4 py-[10px] outline-gray-300 rounded border placeholder:text-[#A9A9B7] border-[#D3D3D4] " type="text" name="storeCurrency" id="storeCurrency" placeholder="Enter store currency" required />
                    </div>

                    <button type="submit" disabled={isStoreUpdating} className="w-full h-10  focus:bg-[#232327] disabled:bg-[#232327] bg-[#232327] p-2 py-[10px] hover:bg-black font-medium rounded text-white flex items-center justify-center gap-2 mt-5">
                        {
                            isStoreUpdating ? <><span>Saving</span> <LoaderSpinner shapeHeight='15' shapeWidth='15' shapeColor='#fff' /></> : "Save"
                        }

                    </button>

                </form>
            </div>


        </div>
    )

}


export default ManageStore