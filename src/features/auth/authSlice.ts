import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRegister } from './authAPI';
import { RootState, AppThunk } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';


export interface authState {
    name: string | null,
    uid: string | null,

    checking?: boolean,

}

const initialState: authState = {
    checking: true,
    name: null,
    uid: null
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state,action:PayloadAction<authState>)=>{
            state.checking = false
            state.name = action.payload.name
            state.uid = action.payload.uid
        },
        checkingFinish: (state,)=>{
            state.checking = false
        },
        logout: (state)=>{
            state.checking=false
            state.name=null
            state.uid=null
        }
    },
    // extraReducers: (builder)=>{
    //     builder.addCase()
    // }
})

export const startRegister = (email:string,password:string,nombre:string):AppThunk=>{
   return async(dispatch)=>{
       const resp = await fetchSinToken("auth/new",{email,password,nombre},"POST")

       const body = await resp.json()
       if(body.ok){
           localStorage.setItem("token",body.token)
           localStorage.setItem("token-init-data",JSON.stringify(new Date().getTime()) )
           dispatch(login({
            uid:body.uid,
            name:body.name
           }))
       }
    }
}

export const startLogin = (email:string,password:string):AppThunk=>{
    return async(dispatch)=>{
        const resp = await fetchSinToken("auth",{email,password},"POST")
        const body = await resp.json()
        if(body.ok){
            localStorage.setItem("token",body.token)
            localStorage.setItem("token-init-date",JSON.stringify(new Date().getTime()) )

            dispatch(login({
                uid:body.uid,
                name:body.name
            }))
        }

    }
}

export const startChecking = ():AppThunk=>{
    return async(dispatch)=>{
        const resp = await fetchConToken("auth/renew")

        const body = await resp.json()
        console.log(body)
        if(body.ok){
            localStorage.setItem("token",body.token)
            localStorage.setItem("token-init-date",JSON.stringify(new Date().getTime()))

            dispatch(login({
                uid:body.uid,
                name:body.name
            }))
        }else{
           
            dispatch(checkingFinish())
        }
    }
}

export const startLogout = ():AppThunk=>{
    return (dispatch)=>{
        localStorage.clear();
        dispatch(logout())
     }
}


export const {login,checkingFinish,logout} = authSlice.actions

export const selectAuth = (state: RootState)=>state.auth
export default authSlice.reducer





