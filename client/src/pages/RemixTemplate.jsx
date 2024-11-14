import { Link, useNavigate } from "react-router-dom"
import TopBar from "../components/TopBar";



const RemixTemplate = () => {

    const navigate = useNavigate();



    return <main className=" max-w-7xl mx-auto px-5">
        {/* Top bar */}
        <TopBar title="Remix Template" />

        {/* Content */}
        <div className="w-full mt-20 flex flex-col justify-center items-center ">

            <div className="p-3 w-fit rounded-lg shadow-xl items-center flex gap-6 ">
                <img className="w-[350px] " src="remix.png" alt="ECommerce Template Preview Screen" />
                {/* Action buttons */}
                <div className="w-full flex items-center flex-col h-full justify-end">
                    <p className="mt-3 text-center font-medium mb-4">Remix our E-commerce template to <br /> get started.</p>
                    <Link to="https://framer.com/projects/new?duplicate=y7nKoZJCd7roMdEXiGxM" target="_blank"><button onClick={() => navigate("/setup")} className="px-8 py-2 rounded bg-[#232327] hover:bg-black text-white">Remix Template</button></Link>
                    <p className="mt-3 text-center text-xs ">Already have the template? <Link className="font-semibold hover:underline" to="/setup">Return to Home</Link></p>
                </div>
            </div>

        </div>


    </main>
}

export default RemixTemplate