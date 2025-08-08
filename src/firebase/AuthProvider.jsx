import React, { createContext, useEffect, useState } from 'react';
import { auth } from './firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    
    const createUser=(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const userProfileUpdate = (profileData)=>{
        setLoading(true);
        return updateProfile(auth.currentUser, profileData);
    }
    
    const logoutUser = ()=>{
        setLoading(true);
        return signOut(auth);
    }
    
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false)
        })
        return ()=>{
            unSubscribe();
        }
    
    },[])
    
    const authInfo={
        user,
        setUser,
        loading,
        createUser,
        loginUser,
        userProfileUpdate,
        logoutUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;