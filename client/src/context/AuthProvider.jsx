import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {

    //States
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    //Create a user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //Login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //Logout user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    //Observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });


        return () => {
            return unsubscribe();
        }
    });


    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logOut
    }


    return <UserContext.Provider value={authInfo}>
        {children}
    </UserContext.Provider>


}

export default AuthProvider