import { useContext, useMemo, useState } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useStoreInfo from '../hooks/useStoreInfo';
import { UserContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import BottomBar from './BottomBar';


const InitialStoreCreate = () => {

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
                navigate("/");

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
        <main>
            <TopBar title="Create Store" />

            <div className='min-h-screen max-w-7xl mx-auto flex justify-center items-center px-5 '>
                <form onSubmit={handleFormSubmit} className="max-w-[600px] w-full bg-white px-4 py-6 md:p-10 rounded-lg" >
                    <h3 className='text-center text-xl md:text-[32px] leading-[160%] font-semibold text-[#232327] mb-5'>Create your store</h3>
                    <div>
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="name">Store Name</label>
                        <input className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]  " type="text" name="storeName" id="storeName" placeholder="Enter store name" required />
                    </div>

                    <div className='mt-2'>
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="location">Where is the business located?</label>
                        <Select styles={customStyles} options={options} className='cursor-pointer rounded-md  ' value={location} onChange={(value) => setLocation(value)} />
                    </div>

                    <div className='mt-2'>
                        <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="storeCurrency">Currency</label>
                        <input defaultValue="$" className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969] " type="text" name="storeCurrency" id="storeCurrency" placeholder="Enter store currency" required />
                    </div>



                    <button type="submit" disabled={isStoreCreating} className="w-full focus:bg-[#232327] disabled:bg-[#232327] bg-[#232327] p-3 hover:bg-black text-base font-medium rounded-md text-white flex items-center justify-center gap-2 mt-5">
                        Create Store
                    </button>

                </form>
            </div>

            <div className='md:hidden '>
                <BottomBar />
            </div>

        </main>
    )
}

export default InitialStoreCreate