import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "sonner"
import { useDispatch, } from 'react-redux';
import { setUser } from '@/redux/AuthSlice';
import { useScroll } from 'framer-motion';
import { Loader2 } from 'lucide-react';
const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const onSubmit = async(data)=>{
           const userinfo = {
              insitiutename:data.insitiutename,
              email:data.email,
              password:data.password
           }
      try {
        setLoading(true)
        const response = await axios.post("http://localhost:3000/user/login",userinfo,{withCredentials:true})
         if(response.data){
            // console.log(response.data);
            toast.success(response.data?.message || "Login successful")
            dispatch(setUser(response.data.existingUser))
            // console.log("existingUser",response.data.existingUser);
            navigate("/dashboard/home")
         }


      } catch (error) {
        // console.error(error);
        toast.error(error?.response?.data?.message || "something went wrong")
        setTimeout(() => {
          setLoading(false)
        }, 1000);

      }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='border-2 rounded-md shadow-md w-full sm:max-w-[400px] p-4'>
            <h3 className='leading-6'>Welcome Back! <br />  
                 <span className="text-gray-500">Please login to your account</span>
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-2 w-full   mt-4'>
                <label className='text-black-500'>Email</label>
                <input type="email" placeholder="Enter your email" className="py-2 px-1 rounded-md border " {...register("email", { required: true })} />
                {errors.email && <span className="text-red-500">Email is required</span>}
                <label className='text-black-500'>Password</label>
                <input type="password" placeholder="Enter your password" className="py-2 px-1 rounded-md  border" {...register("password", { required: true })}  />
                {errors.password && <span className="text-red-500">Password is required</span>}
                
                <div className='flex justify-between mt-2'>
                   <p className='text-gray-500'>Don't have an account?</p>
                   <NavLink to="/signup" className="text-black-500">Sign Up</NavLink>
                </div>
                <button type='submit' className="bg-black  hover:bg-gray-700 text-white font-bold py-3 px-4 rounded">
                    {
                      loading ?  "please wait": "Login"
                    }
                </button>
            </form>
        </div>
      
    </div>
  
  )
}

export default Login
