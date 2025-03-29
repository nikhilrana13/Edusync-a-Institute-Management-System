
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const protectedRoute = ({children}) => {
    const user = useSelector((state)=>state.auth.user);
   //  console.log("user in protected route",user);

    
     if(!user){
        return  <Navigate to="/login" replace /> 
     }

  return  children
}

export default protectedRoute
