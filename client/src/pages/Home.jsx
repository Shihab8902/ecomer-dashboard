import { useContext } from "react"
import { UserContext } from "../context/AuthProvider"
import Login from "./Login";
import Documentation from "./Documentation";


const Home = () => {

    const { user } = useContext(UserContext);

    return <main className="bg-[#F1F1F1]">
        {
            user ? <Documentation /> : <Login />
        }
    </main>


}

export default Home