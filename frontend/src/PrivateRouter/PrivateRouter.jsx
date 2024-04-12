import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { Navigate, useLocation } from "react-router-dom"
import LoadingSpinner from '../components/LoadingSpinner';
// eslint-disable-next-line react/prop-types
const PrivateRouter = ({children}) => {
    const {user, loading} =  useContext(AuthContext);
    const location = useLocation();
    if(loading) {
        return (
            <LoadingSpinner/>
        )
    }
    if(user) {
        return children;
    }
  return <Navigate to="/login" state={{from: location}} replace></Navigate>
  
}

export default PrivateRouter