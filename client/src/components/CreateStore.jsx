import { useContext, useMemo, useState } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import LoaderSpinner from './LoaderSpinner';
import TopBar from './TopBar';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useStoreInfo from '../hooks/useStoreInfo';
import { UserContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CreateStore = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { refetchStore, selectNewStore } = useStoreInfo();

    const { user } = useContext(UserContext)

    const [isStoreCreating, setIsStoreCreating] = useState(false);
    const [location, setLocation] = useState('')




    //Handle form submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsStoreCreating(true)
        const storeName = e.target?.storeName?.value;
        const storeCurrency = e.target.storeCurrency.value;
        const storeData = {
            storeName,
            location,
            storeCurrency,
            admin: user.email
        }
        if (!location) {
            setIsStoreCreating(false);
            Swal.fire({
                text: "Business location is required.",
                icon: "info"
            });
            return;
        }
        axiosPublic.post("/store", storeData)
            .then((res) => {
                refetchStore();
                selectNewStore(res.data);
                Swal.fire({
                    text: "Store Created!",
                    showConfirmButton: false,
                    timer: 1500,
                    icon: "success"
                })
                setIsStoreCreating(false);
                navigate("/remix");

            }).catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                })
                setIsStoreCreating(false);
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
            <TopBar title="Create Store" />

            <div className='h-[80vh] flex justify-center items-center'>
                <form onSubmit={handleFormSubmit} className="max-w-[400px] md:min-w-[400px] bg-[#FDFDFF] p-8 border border-[#EBEBEE]" >
                    <div>
                        <label className="block text-base mb-1  text-[#232327]" htmlFor="name">Store Name</label>
                        <input className="w-full px-4 py-[10px] outline-gray-300 rounded border placeholder:text-[#A9A9B7] border-[#D3D3D4] " type="text" name="storeName" id="storeName" placeholder="Enter store name" required />
                    </div>

                    <div className='mt-3'>
                        <label className="block text-base mb-1  text-[#232327]" htmlFor="location">Where is the business located?</label>
                        <Select styles={customStyles} options={options} className='cursor-pointer rounded-md  outline-gray-300 focus:border-gray-300' value={location} onChange={(value) => setLocation(value)} />
                    </div>

                    <div className='mt-3'>
                        <label className="block text-base mb-1  text-[#232327]" htmlFor="storeCurrency">Store Currency</label>
                        <input defaultValue="$" className="w-full px-4 py-[10px] outline-gray-300 rounded border placeholder:text-[#A9A9B7] border-[#D3D3D4] " type="text" name="storeCurrency" id="storeCurrency" placeholder="Enter store currency" required />
                    </div>



                    <button type="submit" disabled={isStoreCreating} className="w-full h-10  focus:bg-[#232327] disabled:bg-[#232327] bg-[#232327] p-2 py-[10px] hover:bg-black font-medium rounded text-white flex items-center justify-center gap-2 mt-5">
                        {
                            isStoreCreating ? <><span>Creating</span> <LoaderSpinner shapeHeight='15' shapeWidth='15' shapeColor='#fff' /></> : "Create"
                        }

                    </button>

                </form>
            </div>


        </div>
    )
}

export default CreateStore