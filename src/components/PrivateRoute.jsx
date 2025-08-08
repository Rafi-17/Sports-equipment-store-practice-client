import React, { useContext } from 'react';
import { AuthContext } from '../firebase/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {loading, user} = useContext(AuthContext);
    if(user){
        return children;
    }
    if(loading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    return (
        <Navigate to={'/login'}></Navigate>
    );
};

export default PrivateRoute;