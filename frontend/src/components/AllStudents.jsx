import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AllStudents = () => {
  const [studentinfo, setStudentinfo] = useState([])
  const [loading, setloading] = useState(false)


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setloading(true)
        const response = await axios.get("http://localhost:3000/student/allstudents", { withCredentials: true })
        // console.log("response", response.data.students)
        if (response.data) {
          setStudentinfo(response.data.students)
        }


      } catch (error) {
        console.error(error?.response?.data?.message);
      } finally {
        setTimeout(() => {
          setloading(false)
        }, 1000);
      }
    }
    fetchStudents()
  }, [])
  return (


    <div>
      <h1 className='text-2xl font-bold'>All Students</h1>

      <div className="student w-full table mt-12">
        {loading ? (
          <Loader2 className='mx-auto w-30 h-40 animate-spin' />
        ) : studentinfo.length > 0 ? (
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
              {studentinfo.map((student) => (
            
                      <TableRow key={student._id } >
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
                  <TableCell>{student?.name}</TableCell>
                  </NavLink>
                  <TableCell className="hidden md:table-cell">{student?.phone}</TableCell>
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

export default AllStudents
