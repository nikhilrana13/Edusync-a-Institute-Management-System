import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import {toast} from "sonner"

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const onSubmit = async(data)=>{
           const userinfo = {
              insitiutename:data.insitiutename,
              email:data.email,
              password:data.password
           }
      try {
        const response = await axios.post("http://localhost:3000/user/signup",userinfo,{withCredentials:true})
         if(response.data){
            // console.log(response.data);
            toast.success(response.data?.message || "Signup successful")
            navigate("/login")
         }

      } catch (error) {
        // console.error(error);
        toast.error(error?.response?.data?.message)

      }
  }



  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='border-2  shadow-md rounded-md w-full sm:max-w-[400px] p-4'>
            <h3>Create a new account <br />  
                 <span className="text-gray-500"> Sign up </span>
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full   mt-4'>
            <label className='text-black-500'>Institute Name</label>
            <input type="text" placeholder="Enter your name" className="py-2 px-1 rounded-md border"   {...register("insitiutename", { required: true })} />
            {errors.insitiutename && <div className="text-red-500">Institute name is required</div>}
      
                <label className='text-black-500'>Email</label>
                <input type="email" placeholder="Enter your email" className="py-2 px-1 rounded-md border"   {...register("email", { required: true })} />
                {errors.email && <div className="text-red-500">Email is required</div>}
             
                <label className='text-black-500'>Password</label>
                <input type="password" placeholder="Enter your password" className="py-2 px-1 rounded-md  border"  {...register("password", { required: true })} />
                {errors.password && <div className="text-red-500">Password is required</div>}
               
                <div className='flex justify-between mt-2'>
                   <p className='text-gray-500'>Already have an account?</p>
                   <NavLink to="/login" className="text-black-500">Login</NavLink>
                </div>

                <button type='submit' className="bg-black mt-2 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded">Sign Up</button>
            </form>
        </div>
      
    </div> 
  )
}

export default Signup
