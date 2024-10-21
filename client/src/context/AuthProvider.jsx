import { createContext, useEffect, useState } from "react"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {

    //States
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Create user with google
    const googleProvider = new GoogleAuthProvider();

    const createUser = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
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
        logOut
    }


    return <UserContext.Provider value={authInfo}>
        {children}
    </UserContext.Provider>


}

export default AuthProvider