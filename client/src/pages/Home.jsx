import { useContext } from "react"
import { UserContext } from "../context/AuthProvider"
import Dashboard from "./Dashboard";
import Login from "./Login";


const Home = () => {

    const { user } = useContext(UserContext);

    return user ? <Dashboard /> : <Login />


}

export default Home