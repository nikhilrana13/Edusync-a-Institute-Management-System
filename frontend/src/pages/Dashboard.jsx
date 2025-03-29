import Navbar from '@/components/navbar'
import { BookUser, History, Home, Plus, UserCheckIcon,PhoneIcon,MailIcon, User2, Users2} from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


const Dashboard = () => {
  return (
    <div className='min-h-screen '>
    <Navbar />
   <div className='alldata w-full flex'>
       <div className='w-[18%] min-h-screen  border-r-2 bg-[#02055A]'>
           <div className=' gap-5 flex flex-col py-10 px-4  font-[500] text-white'>
           <NavLink to="home"  end className={({isActive})=>`rounded-md py-3 px-2 transition-all duration-300 ${isActive ? "bg-[#EBECF6] text-black":"bg-transparent"}`} >
             <div className='flex items-center gap-4 '>
               <Home  />
               <span className='hidden md:inline'>Home</span>
            </div>
           </NavLink>
           <NavLink to="addcourse" className={({isActive})=>`rounded-md py-3 px-2 transition-all duration-300 ${isActive ? "bg-[#EBECF6] text-black":"bg-transparent"}`}>
             <div className='flex items-center gap-4'>
              <Plus />
               <span className='hidden md:inline'>Add Course</span>
            </div>
           </NavLink>
           <NavLink to="courses" className={({isActive})=>`rounded-md py-3 px-2 transition-all duration-300 ${isActive ? "bg-[#EBECF6] text-black":"bg-transparent"}`}>
             <div className='flex items-center gap-4'>
               <BookUser />
               <span className='hidden md:inline'>All Courses</span>
            </div>
           </NavLink>
           <NavLink to="addstudent" className={({isActive})=>`rounded-md py-3 px-2 transition-all duration-300 ${isActive ? "bg-[#EBECF6] text-black":"bg-transparent"}`}>
             <div className='flex items-center gap-4'>
               <UserCheckIcon />
               <span className='hidden md:inline'>Add Student</span>
            </div>
           </NavLink>
           <NavLink to="students" className={({isActive})=>`rounded-md py-3 px-2 transition-all duration-300 ${isActive ? "bg-[#EBECF6] text-black":"bg-transparent"}`}>
             <div className='flex items-center gap-4'>
               <Users2 />
               <span className='hidden md:inline'>All Student</span>
            </div>
           </NavLink>
           <NavLink to="collectfees" className={({isActive})=>`rounded-md py-3 px-2 transition-all duration-300 ${isActive ? "bg-[#EBECF6] text-black":"bg-transparent"}`}>
             <div className='flex items-center gap-4'>
               💵
               <span className='hidden md:inline'>Collect fees</span>
            </div>
           </NavLink>
           <NavLink to="paymenthistory" className={({isActive})=>`rounded-md py-3 px-2 transition-all duration-300 ${isActive ? "bg-[#EBECF6] text-black":"bg-transparent"}`}>
             <div className='flex items-center gap-4'>
               <History />
               <span className='hidden md:inline'>payment history</span>
            </div>
           </NavLink>
           </div>

           <div className='contact us mt-[70px] text-white '>
            <div className='flex flex-col gap-5 py-10 px-4'>
              <div className='flex items-center gap-4'>
                <PhoneIcon />
                <span className='hidden md:inline'>+91 1234567890</span>
                </div>
                <div className='flex items-center gap-4'> 
                  <div className='flex items-center gap-4'>
                    <MailIcon />
                    <span className='hidden md:inline'>Edusync@example.com</span>
                  </div>
                </div>
                
            </div>
              
           </div>
          
       </div>
       <div className='w-[70%] mx-auto  my-8 text-gray-600 text-base'>
           <Outlet />
       </div>

   </div>
 
</div>
  )
}

export default Dashboard
