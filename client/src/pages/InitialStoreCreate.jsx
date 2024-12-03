import { useContext, useMemo, useState } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useStoreInfo from '../hooks/useStoreInfo';
import { UserContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';


const InitialStoreCreate = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { refetchStore, selectNewStore } = useStoreInfo();

    const { user, logOut } = useContext(UserContext)

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

            <div className='h-screen max-w-7xl mx-auto flex justify-center items-center px-5'>
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



                    <div className="mt-4 flex gap-3 w-full justify-end">
                        <button onClick={handleLogOut} type="button" className="py-3 px-5  focus:bg-[#E93725]  bg-[#E93725]  hover:bg-red-600 text-base font-medium rounded-[4px] text-white  flex items-center justify-center gap-2 ">
                            Logout
                        </button>

                        <button type="submit" disabled={isStoreCreating} className="py-3 px-5  focus:bg-[#232327] disabled:bg-[#232327] bg-[#232327]  hover:bg-black text-base font-medium  rounded-[4px] text-white  flex items-center justify-center gap-2 ">
                            Create Store
                        </button>

                    </div>

                </form>
            </div>


        </main>
    )
}

export default InitialStoreCreate