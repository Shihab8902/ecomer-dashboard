import { useContext } from "react"
import { UserContext } from "../context/AuthProvider"
import Dashboard from "./Dashboard";
import Login from "./Login";


const Home = () => {

    const { user } = useContext(UserContext);

    return <main className="bg-[#F1F1F1]">
        {
            user ? <Dashboard /> : <Login />
        }
    </main>


}

export default Home