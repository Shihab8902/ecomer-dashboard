import { useContext } from "react"
import { UserContext } from "../context/AuthProvider"
import useGetDataPublic from "../hooks/useGetPublic";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


const Dashboard = () => {

    const navigate = useNavigate()

    const { user, logOut } = useContext(UserContext);


    //Fetch order data
    const { data, refetch, isLoading } = useGetDataPublic(["orders", user?.email], `/orders?user=${user?.email}`);

    const handleLogOut = () => {
        Swal.fire({
            title: "Logout",
            text: "Are you sure want to Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        navigate("/")
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            text: "You have been successfully logged out.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })

            }
        });
    }






    return <div className="max-w-7xl mx-auto px-5">
        {/* Top Header */}
        <div className="mt-5 flex justify-between items-center border-b pb-3">
            <h3 className="text-4xl font-semibold">Manage Orders</h3>

            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="User"
                            src="user.png" />
                    </div>
                </div>
                <div
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-52 p-3 shadow-md">
                    {
                        data?.admin && <p className="font-semibold mb-1">Role: <span className="text-green-700">Admin</span></p>
                    }

                    {
                        user?.displayName && <p className="font-semibold mb-1">Name: {user?.displayName}</p>
                    }
                    <p className="font-semibold mb-4">{user?.email}</p>

                    <button onClick={handleLogOut} className="p-2 text-white font-medium bg-red-600">Logout</button>

                </div>
            </div>











        </div>



    </div>

}

export default Dashboard