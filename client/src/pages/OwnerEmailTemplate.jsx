import TopBar from "../components/TopBar"
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import BottomBar from "../components/BottomBar";
import useStoreInfo from "../hooks/useStoreInfo";
import { useNavigate } from "react-router-dom";


const OwnerEmailTemplate = () => {
    const axiosPublic = useAxiosPublic();


    const { currentStore, refetchStore } = useStoreInfo();
    const navigate = useNavigate();


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const subject = e.target.subject.value;
        const body = e.target.body.value;
        const data = { subject, template: body }

        axiosPublic.put(`/store?id=${currentStore?._id}`, { ownerEmailTemplate: data })
            .then(res => {
                if (res.data) {
                    refetchStore();
                    navigate(-1);
                    Swal.fire({
                        text: "Email template has been successfully updated!",
                        showConfirmButton: false,
                        timer: 1500,
                        icon: "success"
                    });


                }
            }).catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                })

            })

    }


    //handle reset
    const handleReset = () => {
        Swal.fire({
            title: "Reset?",
            text: "Are you sure want to reset?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                const subject = "A new order received!";
                const body = `
A new order has been placed by <b>{{customer-name}}</b>

<b>Order number:</b> {{order-number}}
{{product-summary}}
---
<b>Shipping Details</b>

<b>Name: </b> {{customer-name}}
<b>Email: </b> {{customer-email}}

<b>Address:</b> {{shipping-details}}

---
<b>Payment Method: </b> {{payment-method}}
<b>Ordered At: </b> {{order-date}}

`
                const data = { subject, template: body };

                axiosPublic.put(`/store?id=${currentStore?._id}`, { ownerEmailTemplate: data })
                    .then(res => {
                        if (res.data) {
                            refetchStore();
                            navigate(-1);
                            Swal.fire({
                                text: "Email template has been reset to default!",
                                showConfirmButton: false,
                                timer: 1500,
                                icon: "success"
                            });


                        }
                    }).catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: error.message,
                            icon: "error"
                        })

                    })

            }
        })
    }


    return <main >

        {/* Top bar */}
        <TopBar title="Settings" subRoute={true} subRouteTitle="Owner email template" />

        <div className=" max-w-7xl mx-auto px-5">
            <div className="pt-[88px] md:pt-[128px] min-h-screen max-w-[650px] mb-[70px] md:mb-0 mx-auto ">

                <div className="px-4 py-6 md:p-10 bg-white rounded-lg">

                    <p className="text-[#696969] font-normal leading-[140%] text-base ">Use any of these variables in Email body and they will be automatically replaced.</p>
                    <p className="flex items-center border border-[#0000001A] p-3 rounded flex-wrap gap-x-3 gap-y-2 mt-1">
                        <span className="text-[#232327] bg-gray-200 p-1 rounded font-medium  text-sm">{"{{store-name}}"}</span>
                        <span className="text-[#232327] bg-gray-200 p-1 rounded font-medium  text-sm">{"{{order-number}}"}</span>
                        <span className="text-[#232327] bg-gray-200 p-1 rounded font-medium  text-sm">{"{{order-date}}"}</span>
                        <span className="text-[#232327] bg-gray-200 p-1 rounded font-medium  text-sm">{"{{product-summary}}"}</span>
                        <span className="text-[#232327] bg-gray-200 p-1 rounded font-medium  text-sm">{"{{customer-name}}"}</span>
                        <span className="text-[#232327] bg-gray-200 p-1 rounded font-medium  text-sm">{"{{customer-email}}"}</span>
                        <span className="text-[#232327] bg-gray-200 p-1 rounded font-medium  text-sm">{"{{shipping-details}}"}</span>
                        <span className="text-[#232327] bg-gray-200 p-1 rounded font-medium  text-sm">{"{{payment-method}}"}</span>
                    </p>

                    <form className="mt-5 " onSubmit={handleFormSubmit}>
                        <div>
                            <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="providerName">Email subject</label>
                            <input defaultValue={currentStore?.ownerEmailTemplate?.subject} className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969]" type="text" name="subject" placeholder="Enter email subject" required />
                        </div>
                        <div className="mt-2">
                            <label className="block text-base mb-1 font-medium leading-[160%] text-[#232327]" htmlFor="Reason">Email body</label>
                            <textarea defaultValue={currentStore?.ownerEmailTemplate?.template} className="w-full outline-none  px-3 py-[14px] rounded-md text-[#232327] bg-[#F6F6F6] text-base font-normal placeholder:text-[#696969] min-h-56 resize-none" name="body" placeholder="Email body..." required />
                        </div>
                        <div className="flex w-full justify-end gap-5">
                            <button onClick={handleReset} type="button" className=" px-5  bg-[#E5E7EB] hover:bg-[#E5E7EB] focus:bg-[#E5E7EB] text-[#232327] cursor-pointer py-3 mt-5  rounded">Reset to default</button>
                            <input className="w-[130px] bg-[#232327] text-white cursor-pointer py-3 mt-5 hover:bg-black rounded" type="submit" value="Save" />
                        </div>
                    </form>
                </div>

            </div>
        </div>


        <div className='md:hidden '>
            <BottomBar />
        </div>


    </main>

}
export default OwnerEmailTemplate