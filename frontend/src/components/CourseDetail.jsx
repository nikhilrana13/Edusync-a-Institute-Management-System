import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { NavLink } from 'react-router-dom'
import { Button } from './ui/button'
import CourseEdit from './CourseEdit'
import { toast } from 'sonner'


const CourseDetail = () => {
  const [courseinfo, setCourseInfo] = useState({})
  const [loading,setLoading] = useState(false)
  const {id} = useParams();
  // console.log("id",id);

  // delete course
   const DeleteCourse = async()=>{
          try {
            const response = await axios.delete(`http://localhost:3000/course/deletecourse/${id}`,{withCredentials:true})
            if(response.data){
              toast.success(response.data?.message || "Course deleted successfully");
            }
            
          } catch (error) {
            console.error(error?.response?.data?.message || "Something went wrong");
          }
   }


  useEffect(()=>{
         const fetchCourseInfo = async()=>{
          try {
            setLoading(true)
              const response = await axios.get(`http://localhost:3000/course/details/${id}`,{withCredentials:true})
              if(response.data){

                setCourseInfo(response.data.Course)
                // console.log("courseinfo",courseinfo);
              }
            
          } catch (error) {
            console.error(error?.response?.data?.message || "Something went wrong");
          }finally{
            setTimeout(()=>{
              setLoading(false)
            },1000)
          }
         }
         fetchCourseInfo();
  },[id])

  return (
    <div  className='flex flex-col '>
       <div className='flex flex-col  md:flex-row gap-8 '>
          <div className='w-full md:w-1/2'>
             <img src={courseinfo?.image} className='w-full h-full rounded-md' alt="course image" />
          </div>
           <div className='flex flex-col p-2 sm:p-5 gap-4'>
            <h2 className='font-bold text-2xl '>{courseinfo?.name}</h2>
            <p className='w-full sm:max-w-[30rem] leading-7'>{courseinfo?.description}</p>
            <p className='font-bold text-2xl '>Price: {courseinfo?.price}</p>
            <p>Duration: {courseinfo?.duration}</p>
            <div className='flex gap-4 flex-wrap'>
            <Button>
              <CourseEdit />
            </Button>
            <Button variant="destructive" onClick={DeleteCourse}>Delete</Button>

            </div>
           </div>
          
          
         
      

       </div>

         
        {/* enroll students table  */}
        <div className="student w-full table mt-12 ">
          <h1 className='text-2xl font-[500] p-2'>Enrolled Students</h1>
        {loading ? (
          <Loader2 className='mx-auto w-30 h-40 animate-spin' />
        ) : courseinfo?.students?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Student pic</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="text-right">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courseinfo?.students.map((student) => (
            
                      <TableRow key={student?._id } >
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage
                        className="h-10 w-10 rounded-full"
                        src={student?.profilePicture || "/default-avatar.png"}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <NavLink to={`/dashboard/students/${student._id}`} className="cursor-pointer">
                  <TableCell className="text-center">{student?.name}</TableCell>
                  </NavLink>
                  <TableCell  className="hidden md:table-cell">{student?.phone}</TableCell>
                  <TableCell className="text-right">{student?.email}</TableCell>
                </TableRow>

                
            
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className='text-center mt-12 text-gray-500'>No students found</p>
        )}
      </div>

       </div>
      
  
  )
}

export default CourseDetail
