
import React, { useState ,useEffect} from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";

function DashboardHome() {
  const [loading,setloading] = useState(false)
  const [studentinfo,setStudentinfo] = useState([])
  const [coursecount,setCoursecount] = useState([])
  const [feescount,setFeescount] = useState(0)


  useEffect(() => {
          const fetchCourses = async()=>{
            try {
              const res = await axios.get("http://localhost:3000/course/allcourses",{withCredentials:true})
              if(res.data){
                setCoursecount(res.data.Courses)
              }

            } catch (error) {
              console.log(error?.response?.data?.message);
              
            }
          }
          fetchCourses()
  },[])
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setloading(true)
        const response = await axios.get("http://localhost:3000/student/allstudents", { withCredentials: true })
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

  useEffect(()=>{
      const fetchTotalAmount = async()=>{
         try {
              const res = await axios.get("http://localhost:3000/fees/totalamount",{withCredentials:true})
              if(res.data){
                // console.log(res.data.totalamount);
                setFeescount(res.data.totalamount)
              }

         } catch (error) {
          console.log(error?.response?.data?.message || "Something went wrong");
          
         }
      }
      fetchTotalAmount()
  },[])
  return (
    <div className=" flex flex-col gap-5">
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Total Students"
        value={studentinfo?.length || "0"}
        icon={<Users className="h-8 w-8 text-blue-500" />}
        color="bg-blue-50"
      />
      <MetricCard
        title="Total Courses"
        value={coursecount?.length || "0"}
        icon={<BookOpen className="h-8 w-8 text-green-500" />}
        color="bg-green-50"
      />
      <MetricCard
        title="Total Amount"
        value={feescount || "0"}
        icon={<DollarSign className="h-8 w-8 text-purple-500" />}
        color="bg-purple-50"
      />
    </div>

    <div className="student table mt-12">
      <h1 className="text-2xl font-bold">All students</h1>
      {loading ? (
          <Loader2 className='mx-auto w-30 h-40 animate-spin' />
        ) : studentinfo.length > 0 ? (
          <Table className="mt-5">
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
                <TableRow key={student._id}>
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage
                        className="h-10 w-10 rounded-full"
                        src={student?.profilePicture || "/default-avatar.png"}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{student?.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{student?.phone}</TableCell>
                  <TableCell className="text-right">{student?.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className='text-center mt-12 text-gray-500'>No students found</p>
        )}
   

    {/* <Table className="mt-4">
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Student pic</TableHead>
      <TableHead>Student Name</TableHead>
      <TableHead className="hidden md:table-cell">Phone</TableHead>
      <TableHead className="text-right">Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">
      <Avatar>
         <AvatarImage className="h-10 w-10 rounded-full" src="https://github.com/shadcn.png" />
           <AvatarFallback>CN</AvatarFallback>
     </Avatar>
      </TableCell>
      <TableCell>Nikhil rana</TableCell>
      <TableCell className="hidden md:table-cell">Credit Card</TableCell>
      <TableCell className="text-right">d6E7o@example.com</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">
      <Avatar>
         <AvatarImage className="h-10 w-10 rounded-full" src="https://github.com/shadcn.png" />
           <AvatarFallback>CN</AvatarFallback>
     </Avatar>
      </TableCell>
      <TableCell>Nikhil rana</TableCell>
      <TableCell className="hidden md:table-cell">Credit Card</TableCell>
      <TableCell className="text-right">d6E7o@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table> */}
    </div>
    </div>
 


  );
}

export default DashboardHome;

function MetricCard({ title, value, icon, color }) {
  return (
    <Card className="overflow-hidden border-none shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <CardContent className={`p-0 ${color}`}>
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="rounded-full p-3 bg-white/80 shadow-sm">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
