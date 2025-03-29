
import React, { useEffect,useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'




const EditStudentProfile = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [studentinfo, setStudentinfo] = useState([])
    const [studentprofilepic, setStudentprofilepic] = useState("")
    const {id} = useParams();
    // console.log("id",id);

    // fetch student details
    useEffect(()=>{
         const fetchstudentinfo = async()=>{
            try {
                const response = await axios.get(`http://localhost:3000/student/studentdetails/${id}`, { withCredentials: true })
                if(response.data && response.data.student){
                    setStudentinfo(response.data.student[0]);
                    setStudentprofilepic(response.data.student[0].profilePicture)
                    //  console.log("studentinfo", response.data.student[0]);
                    setValue("name", response.data.student[0].name);
                    setValue("email", response.data.student[0].email);
                    setValue("phone", response.data.student[0].phone);
                    setValue("address", response.data.student[0].address);
                }
            } catch (error) {
                console.error(error?.response?.data?.message || "Something went wrong");
            }
         }
         fetchstudentinfo();
        
    },[id,setValue])

    // update function
    const onSubmit = async(data) => {
           const formdata = new FormData();
           formdata.append("name", data.name);
           formdata.append("email", data.email);
           formdata.append("phone", data.phone);
           formdata.append("address", data.address);

           for (let pair of formdata.entries()){
            console.log(pair[0]+ ', '+ pair[1]);
           }
            // check if profile pic is uploaded
             if(data.profilePicture?.[0]){
                formdata.append("profilePicture", data.profilePicture[0]);
             }
           try {
             const response = await axios.put(`http://localhost:3000/student/updatestudent/${id}`,formdata,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
             })
             console.log("response",response.data.message);
             if(response.data){
                toast.success(response.data?.message || "Profile updated successfully")
             }
            
           } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
           }
    };
  return (
    <Dialog>
    <DialogTrigger asChild>
    <p className="cursor-pointer">Edit Profile</p>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right">
            Name
          </label>
          <Input id="name"   className="col-span-3" {...register("name", { required: true })} />
        </div>
        {errors.name && <span className="text-red-500">Name is required</span>}
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="email" className="text-right">
            email
          </label>
          <Input id="email"   className="col-span-3" {...register("email", { required: true })} />
        </div>
        {errors.email && <span className="text-red-500">Email is required</span>}
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="company" className="text-right">
            Phone
          </label>
          <Input id="text"  className="col-span-3" {...register("phone", { required: true })} />
        </div>
        {errors.company && <span className="text-red-500">phone is required</span>}
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="phone no" className="text-right">
            Address
          </label>
          <Input id="text"  className="col-span-3" {...register("address", { required: true })} />
        </div>
        {errors.phone && <span className="text-red-500">address is required</span>}
        <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="profilePicture">Profile Picture</label>
                  
    {/* Show the existing profile picture */}
    {studentinfo?.profilePicture && (
        <img 
            src={studentinfo && studentinfo.profilePicture} 
            alt="Current Profile"
            className="w-20 h-20 rounded-full mb-2"
        />
    )}            <Input id="profilePicture" type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    setValue("profilePicture", file)
                    trigger("profilePicture"); // manually trigger validation
                  }}
                    {...register("profilePicture")} />
                </div>


      </div>

      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>

      </form>
     
    </DialogContent>
  </Dialog>
  )
}

export default EditStudentProfile

