import React, { FC } from 'react'
import { Navigate } from 'react-router-dom';


export const PublicRoute: FC<any> = ({isAuthenticated,children}) => {

    if(!isAuthenticated){
        return children
    }
  return <Navigate to="/" />
       
    
  
}
