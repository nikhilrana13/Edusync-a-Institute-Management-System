import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Edit, Ghost, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button';
import EditStudentProfile from './EditStudentProfile';
import { toast } from 'sonner';
const StudentProfile = () => {
  const [loading, setloading] = useState(false)
  const [studentinfo, setStudentinfo] = useState([])
  const [paymentinfo,setPaymentinfo] = useState([])
  const { id } = useParams();




  //   delete student function
   
  const DeleteStudent = async()=>{
    try {
         const response = await axios.delete(`http://localhost:3000/student/deletestudent/${id}`,{withCredentials:true});
         console.log(response.data)
         if(response.data){
           toast.success(response.data?.message || "Student deleted successfully");
         }
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
  // fetch student details
  useEffect(() => {
    const fetchStudentProfile = async () => {

      try {
        setloading(true)
        const response = await axios.get(`http://localhost:3000/student/studentdetails/${id}`, { withCredentials: true })
        if (response.data) {
          // console.log("studentinfo", response.data.student);
          setStudentinfo(response.data.student[0])
          // console.log("studentinfo", studentinfo);
        }
      } catch (error) {
        console.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setTimeout(() => {
          setloading(false)
        }, 1000);
      }


    }
    fetchStudentProfile();
  }, [id])

  // fetch student payment history 
   useEffect(()=>{
        const fetchPaymenthistory = async()=>{
          try {
            const response = await axios.get(`http://localhost:3000/fees/paymenthistory/${studentinfo._id}`,{withCredentials:true})
            // console.log("paymenthistory",response.data.paymenthistory)
            if(response.data){
              setPaymentinfo(response.data.paymenthistory)
            }

          } catch (error) {
            console.log(error?.response?.data?.message || "something went wrong")
          }
        }
        fetchPaymenthistory();
   },[studentinfo._id])
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-[600]">Student Details</h1>

      {loading ? (
        <Loader2 className="animate-spin w-30 h-30 mt-[50px] mx-auto" />
      ) : studentinfo ? (
        <div className="flex flex-col mt-5 md:flex-row gap-8">
          {/* Profile Image */}
          <div className="w-full mt-5 md:w-1/2">
            <img
              src={studentinfo.profilePicture || "/default-avatar.png"}
              className="w-[200px] h-[200px] rounded-full"
              alt="Student Profile"
            />
          </div>

          {/* Student Info */}
          <div className="flex flex-col p-2 font-[500] sm:p-5 gap-4">
            <h2>Name: {studentinfo.name || "N/A"}</h2>
            <span>Email: {studentinfo.email || "N/A"}</span>
            <p>Phone: {studentinfo.phone || "N/A"}</p>
            <p>Address: {studentinfo.address || "N/A"}</p>

            <div className="flex flex-wrap mt-3 gap-5">
            <Button className="hover:bg-[#02055A]">
              <EditStudentProfile />
            </Button>
            <Button variant="destructive"  onClick={DeleteStudent}>Delete</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500 text-2xl"> Student Details not found</div>
      )}

      {/* students payment tables */}
      
      <div className='tables mt-12'>
         <h1 className='text-2xl font-[600]'>Payment history</h1>
          {loading ? (
                  <Loader2 className='mx-auto w-30 h-40 animate-spin' />
                ) : paymentinfo.length > 0 ? (
                  <Table className="mt-8">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Date of Payment</TableHead>
                        <TableHead className="hidden md:table-cell">Amount</TableHead>
                        <TableHead className="text-right">Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentinfo.map((pay) => (
                        <TableRow key={pay._id} className="cursor-pointer">
                          <TableCell>{pay?.studentname?.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{new Date(pay?.date).toLocaleDateString("en-GB")}</TableCell>
                          <TableCell>{pay?.amount}</TableCell>
                          <TableCell className="text-right">{pay?.remarks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className='text-center mt-12 text-gray-500'>No payment history</p>
                )}

      </div>






    </div>


  )
}

export default StudentProfile
