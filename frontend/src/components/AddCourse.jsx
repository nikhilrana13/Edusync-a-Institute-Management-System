import React from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const AddCourse = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading,setloading] = useState(false)
  const onSubmit = async (data) => {
          const formdata = new FormData();
          formdata.append("name", data.name);
          formdata.append("description", data.description);
          formdata.append("price", data.price);
          formdata.append("duration", data.duration);

          if(data.image.length > 0 ){
            formdata.append("image", data.image[0]);
          }

           try {
            setloading(true)
            const response = await axios.post("http://localhost:3000/course/addcourse",formdata,{headers:
              {"Content-Type":"multipart/form-data"},withCredentials:true
            })
                console.log("response",response.data.Course);
               toast.success(response.data?.message || "Course added successfully")
               reset()
           } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong")
          
           }finally{
            setloading(false);
           }
  };


  return (
    <div className="max-w-2xl mx-auto mt-2 p-3 border bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-700">Add a Course</h2>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className='flex flex-col gap-3'>
        <label className="block text-gray-600">Course name</label>
        <Input type="text" className="w-full px-3 py-2 border rounded mt-1" placeholder="Enter course name" {...register("name", { required: true })} />
      </div>
      {errors.name && <span className="text-red-500">Course name is required</span>}

      <div className='flex flex-col gap-3'>
        <label className=" text-gray-600"> Description</label>
        <Textarea placeholder="Enter course description" {...register("description", { required: true })} />
      </div>
      {errors.description && <span className="text-red-500">Description is required</span>}
    

      <div className='flex flex-col gap-3'>
        <label className="block text-gray-600">Amount</label>
        <Input
          type="text"
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter Amount" {...register("price", { required: true })}
        />
      </div>
      {errors.price && <span className="text-red-500">Amount is required</span>}
     
      <div className='flex flex-col gap-3'>
        <label className=" text-gray-600">Duration</label>
        <Input
          type="text"
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter Duration"  {...register("duration", { required: true })}
        />
      </div>
      {errors.duration && <span className="text-red-500">Duration is required</span>}
      {/* upload image */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="image">Image</label>
      <Input id="image" type="file" accept="image/*" {...register("image", { required: true })} onChange={(e)=>setValue(e.target.files)}  />
    </div>
    {errors.image && <span className="text-red-500">Image is required</span>}
      <button type='submit' className="w-full bg-[#02055A]  hover:bg-blue-800 text-white p-3 rounded-lg transition-all">
        {}
        {loading ? <Loader2 className='animate-spin w-6 h-6  mx-auto ' /> : "Add course"}
      </button>
    </form>
  </div>
  )
}

export default AddCourse
