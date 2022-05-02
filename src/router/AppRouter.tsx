import React, { useEffect } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import App from '../App';
import { Auth } from '../features/auth/Auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectAuth, startChecking } from '../features/auth/authSlice';

export const AppRouter = () => {
  const {uid,checking,name} = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(startChecking())
  },[dispatch])


  if(!checking){
    return(
      <span>Espere...</span>
    )
  }

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={

              <PublicRoute isAuthenticated={!!uid}>
                <Auth />
              </PublicRoute>
            }/>

            <Route path='/*' element={
              <PrivateRoute isAuthenticated={!!uid}>
                <App />
              </PrivateRoute>
            } />
        </Routes>
    </BrowserRouter>
  )
}
