/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useLoginUserMutation } from "../redux/features/auth/authApi"
import { toast } from 'react-toastify'; 
import {setUser} from "../redux/features/auth/authSlice"


const Login = () => {
    
    const [message,setMessage]=useState("")
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")


    const dispatch=useDispatch();
    const [loginUser,{isLoading}]=useLoginUserMutation()
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault()
        const loginData={
            email,
            password
        }
        
        try {
          const response =await loginUser(loginData).unwrap();
          const {token,data}=response;
          dispatch(setUser({user:data}));
          toast.success("Login successful!");
          navigate("/");
       
        } catch (error) {
          console.error("Login failed:", error);
          setMessage('please provide a valid email and password')
          
        }
        
    }
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8"> 
        <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
        <form className="space-y-5 max-w-sm mx-auto pt-8">
            <input 
            onChange={(e)=>setEmail(e.target.value)}
            type="email" name="email" id="email"
            placeholder="Email Address" required 
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"/>

            <input
            onChange={(e)=>setPassword(e.target.value)}
            type="password" name="password" id="password"
            placeholder="Password" required 
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"/>

            {
                message && <p className="text-red-500">{message}</p>
            }

            <button
            onClick={handleLogin}
            className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md" type="submit">Login</button>
        </form>

        <p className="my-5 italic text-sm text-center">Don&apos;t have an account? 
            <Link to="/register" className="underline text-red-700 p-1">Register</Link> here.</p>
      </div>
    </section>
  )
}

export default Login
