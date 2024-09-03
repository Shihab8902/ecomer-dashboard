import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/AuthProvider';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);


    if (loading) {
        return <div className='text-center my-20 text-7xl'>
            <span className="loading loading-spinner text-success w-[80px]"></span>
        </div>
    }


    if (user) {
        return children;
    }



    return <Navigate to="/login"></Navigate>
}

export default PrivateRoute