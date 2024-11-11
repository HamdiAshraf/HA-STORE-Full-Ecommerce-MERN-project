/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterUserMutation } from "../redux/features/auth/authApi"
import { toast } from 'react-toastify'; 

const Register = () => {
   
   const [message,setMessage]=useState("")
   const [username,setUsername]=useState("")
   const [email,setEmail]=useState("")
   const[password,setPassword]=useState("")

   const dispatch=useDispatch();
   const [registerUser,{isLoading}]=useRegisterUserMutation()
   const navigate=useNavigate();

   const handleRegister=async(e)=>{
       e.preventDefault()
       const data={
        username,
           email,
           password
       }
       

       try {
        const response=await registerUser(data).unwrap()
        toast.success("Register successful!");
        navigate("/login")

       } catch (error) {
        console.error("register failed:", error);
          setMessage("registeration failed")
          
       }
       
   }
 return (
   <section className="h-screen flex items-center justify-center">
     <div className="max-w-sm border shadow bg-white mx-auto p-8"> 
       <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
       <form className="space-y-5 max-w-sm mx-auto pt-8">
       <input 
           onChange={(e)=>setUsername(e.target.value)}
           type="username" name="username" id="username"
           placeholder="Username" required 
           className="w-full bg-gray-100 focus:outline-none px-5 py-3"/>

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
           onClick={handleRegister}
           className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md" type="submit">Register</button>
       </form>

       <p className="my-5 italic text-sm text-center">Already have an account? 
           <Link to="/login" className="underline text-red-700 p-1">Login</Link> here.</p>
     </div>
   </section>
 )
}


export default Register
