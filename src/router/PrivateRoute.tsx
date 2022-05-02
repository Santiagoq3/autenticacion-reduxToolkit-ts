import { FC } from "react"
import { Navigate } from "react-router-dom";

export const PrivateRoute: FC<any> = ({isAuthenticated,children}) => {

   if(!isAuthenticated){
       return <Navigate to="/login" />
   }

  return children 
         
   
}
