import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/AuthProvider';
import LoaderSpinner from '../components/LoaderSpinner';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);


    if (loading) {
        return <LoaderSpinner shapeWidth="40" shapeHeight="40" shapeColor="#6E717D" />
    }


    if (user) {
        return children;
    }



    return <Navigate to="/login"></Navigate>
}

export default PrivateRoute