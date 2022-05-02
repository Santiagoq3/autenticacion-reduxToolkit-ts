import { authState } from './authSlice';


export const fetchRegister = ()=>{
    return new Promise<authState>((resolve)=>{
        setTimeout(() => {
            resolve({name: "santiago",uid:"321465"})
        }, 5000);
    })
}