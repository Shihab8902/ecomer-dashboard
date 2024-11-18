import { useContext } from "react"
import { UserContext } from "../context/AuthProvider"
import Login from "./Login";
import Dashboard from "./Dashboard";
import { useLocation } from "react-router-dom";
import Documentation from "./Documentation";


const Home = () => {

    const { user } = useContext(UserContext);
    const location = useLocation();

    return !location?.state?.renderDocs ? <main className="bg-[#F1F1F1]">
        {
            user ? <Dashboard /> : <Login />
        }
    </main> :
        <Documentation />


}

export default Home