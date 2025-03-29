import { Loader2 } from 'lucide-react';
import { Input } from './ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'sonner'

const AddStudent = () => {
  const [loading, setloading] = useState(false)
  const { register, handleSubmit, setValue, trigger, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("phone", data.phone);
    formdata.append("address", data.address);
    formdata.append("coursename", data.coursename);


    if (data.profilePicture?.length > 0) {
      formdata.append("profilePicture", data.profilePicture[0]);
    }
       
    // for (let pair of formdata.entries()) {
    //   console.log(pair[0] + " : " + pair[1])
    // }
    try {
      setloading(true)
      const response = await axios.post("http://localhost:3000/student/addstudent", formdata, {
        headers:
          { "Content-Type": "multipart/form-data" }, withCredentials: true
      })
      // console.log("response", response.data.Course);
      toast.success(response.data?.message || "Student add successfully")
      reset()
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong")

    } finally {
      setloading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-2 p-3 border bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Add a Student</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className='flex flex-col gap-3'>
          <label className="block text-gray-600">Student name</label>
          <Input type="text" className="w-full px-3 py-2 border rounded mt-1" placeholder="Enter student name" {...register("name", { required: true })} />
        </div>
        {errors.name && <span className="text-red-500">Name is required</span>}
        <div className='flex flex-col gap-3'>
          <label className=" text-gray-600">Address</label>
          <Input type="text" className="w-full px-3 py-2 border rounded mt-1" placeholder="Enter address" {...register("address", { required: true })} />
        </div>
        {errors.address && <span className="text-red-500">Address is required</span>}

        <div className='flex flex-col gap-3'>
          <label className="block text-gray-600">Phone Number</label>
          <Input
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter Phone number"
            {...register("phone", { required: true })}
          />
        </div>
        {errors.phone && <span className="text-red-500">Phone number is required</span>}

        <div className='flex flex-col gap-3'>
          <label className=" text-gray-600">Email</label>
          <Input
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter Email" {...register("email", { required: true })}
          />
        </div>
        {errors.email && <span className="text-red-500">Email is required</span>}
        <div className='flex flex-col gap-3'>
          <label className=" text-gray-600">Course Name</label>
          <Input
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter Course Name"
            {...register("coursename", { required: true })}
          />
        </div>

        {/* upload image */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="profilePicture">Profile Picture</label>
          <Input id="profilePicture" type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files[0];
            setValue("profilePicture", file)
            trigger("profilePicture"); // Manually trigger validation
          }}
            {...register("profilePicture", { required: true })} />
        </div>
        {errors.profilePicture && <span className="text-red-500">Profile Picture is required</span>}
        <button type='submit' className="w-full bg-[#02055A] hover:bg-blue-800 text-white p-3 rounded-lg transition-all">
          {
            loading ? (
              <Loader2 className='animate-spin w-6 h-6 mx-auto' />
            ) : (
              <span>Submit</span>
            )
          }
        </button>

      </form>
    </div>
  )
}

export default AddStudent
