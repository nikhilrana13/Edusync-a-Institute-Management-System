
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
import { Textarea } from './ui/textarea'


const CourseEdit = () => {
        const { register, handleSubmit, setValue, formState: { errors } } = useForm();
        const [Courseinfo, setCourseinfo] = useState([])
        const [coursepic, setCoursepic] = useState("")
        const {id} = useParams();
        // console.log("id",id);
    
        // fetch student details
        useEffect(()=>{
             const fetchCourseinfo = async()=>{
                try {
                    const response = await axios.get(`http://localhost:3000/course/details/${id}`, { withCredentials: true })
                    if(response.data && response.data.Course){
                        setCourseinfo(response.data.Course);
                        setCoursepic(response.data.Course.image)
                        //  console.log("studentinfo", response.data.Course);
                        setValue("name", response.data.Course.name);
                        setValue("description", response.data.Course.description);
                        setValue("duration", response.data.Course.duration);
                        setValue("price", response.data.Course.price || "0");
                    }
                } catch (error) {
                    console.error(error?.response?.data?.message || "Something went wrong");
                }
             }
             fetchCourseinfo();
            
        },[id,setValue])
    
        // update function
        const onSubmit = async(data) => {
               const formdata = new FormData();
               formdata.append("name", data.name);
               formdata.append("duration", data.duration);
               formdata.append("price", data.price);
               formdata.append("description", data.description);
    
            //    for (let pair of formdata.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]);
            //    }
                // check if profile pic is uploaded
                 if(data.image?.[0]){
                    formdata.append("image", data.image[0]);
                 }
               try {
                 const response = await axios.put(`http://localhost:3000/course/updatecourse/${id}`,formdata,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                 })
                 console.log("response",response.data.message);
                 if(response.data){
                    toast.success(response.data?.message || "Course updated successfully")
                 }
                
               } catch (error) {
                toast.error(error?.response?.data?.message || "Something went wrong");
               }
        };

  return (
    <Dialog>
    <DialogTrigger asChild>
    <p className="cursor-pointer">Edit Course</p>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogDescription>
          Make changes to your Course here. Click save when you're done.
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
          <label htmlFor="description" className="text-right">
            Description
          </label>
          <Textarea id="description"   className="col-span-3" {...register("description", { required: true })} />
        </div>
        {errors.description && <span className="text-red-500">description is required</span>}
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="Price" className="text-right">
            Price
          </label>
          <Input id="price"  className="col-span-3" {...register("price", { required: true })} />
        </div>
        {errors.price && <span className="text-red-500">price is required</span>}
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="duration" className="text-right">
            Duration
          </label>
          <Input id="text"  className="col-span-3" {...register("duration", { required: true })} />
        </div>
        {errors.duration && <span className="text-red-500">duration is required</span>}
        <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="image">Course Image</label>
                  
    {/* Show the existing profile picture */}
    {Courseinfo?.image && (
        <img 
            src={Courseinfo && Courseinfo.image} 
            alt="Current image"
            className="w-20 h-20 rounded-full mb-2"
        />
    )}            <Input id="profilePicture" type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    setValue("image", file)
                    trigger("image"); // manually trigger validation
                  }}
                    {...register("image")} />
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

export default CourseEdit
