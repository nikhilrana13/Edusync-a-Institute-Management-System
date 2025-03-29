import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const AllCourses = () => {
   const [coursedata, setcoursedata] = useState([])
   const [loading, setloading] = useState(false)

           useEffect(()=>{
            const fetchCourse = async()=>{
              try {
                setloading(true)
                const response = await axios.get("http://localhost:3000/course/allcourses",{withCredentials:true})
                if(response.data){
                  // console.log(response.data)
                  setcoursedata(response.data.Courses)
                }
                
              } catch (error) {
                console.error(error?.response?.data?.message)
              } finally{
                setTimeout(() => {
                  setloading(false)
                }, 1000);
              }
            }
             fetchCourse()
                
           },[])
  return (
    <div className="container w-full ">
        
        {
          loading ?(
            <>
               <div className="grid w-full grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {Array(8)
              .fill("")
              .map((_, index) => (
                <div key={index} className="animate-pulse p-2 px-3 overflow-hidden">
                  <div className=" w-full h-[200px] md:h-[250px]  bg-gray-300 rounded-[14px]"></div>
                  <div className="mt-3 h-6 w-3/4 bg-gray-300 rounded"></div>
                  <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
                </div>
              ))}
                </div>
            </>
           
          ):(coursedata.length > 0) ? (
            <div className='cards  grid grid-cols-1  gap-5 md:grid-cols-2 lg:grid-cols-3 '>
               {
                coursedata.map((course)=>{
                  return(
                    <NavLink to={`/dashboard/courses/${course._id}`}>
                        <CourseCard key={course._id} title={course.name} price={course.price} image={course.image} />

                    </NavLink>
                  

                  )
                })
               }

              </div>
          
          ):(
            <div className='flex justify-center mt-12 items-center'>
               <h1 className='text-2xl font-bold'>No course found</h1>
            </div>
          )
        }
             
    </div>
  
  )
}

export default AllCourses
