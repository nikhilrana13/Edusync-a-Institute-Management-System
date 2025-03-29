import { setUser } from '@/redux/AuthSlice';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();
const [loading,setloading] = useState(false)
const user = useSelector((state)=>state.auth.user);


  const handleLogout = async()=>{
    setloading(true)
     try {
           const res =  await axios.get('http://localhost:3000/user/logout',{withCredentials:true})
           console.log('logout',res.data)
           if(res.data){
            setTimeout(() => {
                navigate('/')
                dispatch(setUser(null))
            }, 1000);
          

           }
            
        
     } catch (error) {
        console.log('error',error)
        setloading(false)
     } 
  }

  return (
    <div className=' flex items-center py-8 px-1 sm:px-8 justify-between bg-[#02055A]'>
    <div>
    <NavLink to="/" className="flex flex-col">
         <span className="text-[1.5rem] sm:text-2xl  text-white font-bold" >EduSync</span>
      </NavLink>
    </div>

    {
        loading ? (
            <Button onClick={handleLogout} className="px-7 py-2 rounded-full ">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            </Button>
                
        ):(
            <div className='flex gap-5 flex-col  items-center'>
            <span className='text-[1rem] text-white'>Welcome 😄 ! {user.insitiutename || "User"}</span>
          <Button onClick={handleLogout} className="px-7 py-2 rounded-full bg-white hover:bg-[#D9D9D9] text-black">
            Logout
        </Button>
            </div>
          

        )
    }

   
</div>
  )
}

export default Navbar
