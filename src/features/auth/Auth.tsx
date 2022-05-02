import React, { FC, useState } from 'react'
import { fetchRegister } from './authAPI';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login, selectAuth, authState, startRegister, startLogin } from './authSlice';
import "./auth.css"

interface loginForm{
    email:string,
    password: string
}
interface registerForm{
    rName: string,
    rEmail:string,
    rPassword: string
}
export const Auth: FC = () => {

    const dispatch  = useAppDispatch()
    const [inputLoginValues, setInputLoginValues] = useState<loginForm>({
        email: "",
        password: ""
    })

    const {email,password} = inputLoginValues

    const [inputRegistervalues, setinputRegistervalues] = useState<registerForm>({
        rName:"",
        rEmail:"",
        rPassword:""
    })

    const {rName,rEmail,rPassword} = inputRegistervalues

    const {checking,name} = useAppSelector(selectAuth)


    const handleRegister = async()=>{
      const resp = await  fetchRegister()
      console.log(resp)
      dispatch(login(resp))
    }

   
    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputLoginValues({
            ...inputLoginValues,
            [e.target.name]:e.target.value
        })
    } 
    const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setinputRegistervalues({
            ...inputRegistervalues,
            [e.target.name]:e.target.value
        })
    }

    const handleRegisterForm = (e: React.FormEvent)=>{
        e.preventDefault()
        dispatch(startRegister(rEmail,rPassword,rName))
    }
    const handleLoginForm = (e: React.FormEvent)=>{
        e.preventDefault()
        dispatch(startLogin(email,password))
    }

    
  return (
    <div className='auth'>

        <form onSubmit={handleRegisterForm} >
            Register
            <input type={"text"} name="rName" value={rName} placeholder="ingrese el nombre" onChange={handleRegisterInputChange}  />

            <input type={"email"} name="rEmail" value={rEmail}  placeholder="ingrese el email" onChange={handleRegisterInputChange} />

            <input type={"password"} name="rPassword" value={rPassword} placeholder="ingrese la contraseña" onChange={handleRegisterInputChange} />
            <button type='submit'>
                Enviar
            </button>
        </form>
        <form onSubmit={handleLoginForm} >
            Login
            <input type={"email"} name="email" value={email} placeholder="ingrese el email" onChange={handleLoginInputChange} />

            <input type={"password"} name="password" value={password} placeholder="ingrese la contraseña" onChange={handleLoginInputChange} />
            <button type='submit'>
                Enviar
            </button>
        </form>
        <button onClick={handleRegister} >
            Registrarse
        </button>
    </div>
  )
}
