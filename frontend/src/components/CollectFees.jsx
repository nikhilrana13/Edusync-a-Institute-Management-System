import React from 'react'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'sonner';


const CollectFees = () => {
  const {register,handleSubmit,reset,formState:{errors}} = useForm();

  const onSubmit = async(data)=>{
         const formdata = {
            "studentname":data.studentname,
            "amount":data.amount,
            "remarks":data.remarks,
            "coursename":data.coursename
         }
        //  console.log("formdata",formdata);
        try {
          const response = await axios.post("http://localhost:3000/fees/collectfees",formdata,{withCredentials:true})

          if(response.data){
            toast.success(response.data?.message || "Fees collected successfully")
          }
          reset();
          
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong")
   
        }
    
  }

  return (
      <div className="max-w-2xl mx-auto mt-2 p-3 border bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Collect fees</h2>
    
        <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className='flex flex-col gap-3'>
            <label className="block text-gray-600">Student name</label>
            <Input type="text" className="w-full px-3 py-2 border rounded mt-1" placeholder="Enter student name" {...register("studentname", { required: true })} />
          </div>
          {errors.studentname && <span className="text-red-500">Student name is required</span>}
          <div className='flex flex-col gap-3'>
            <label className=" text-gray-600"> Amount</label>
            <Input placeholder="Enter amount" {...register("amount", { required: true })} />
          </div>
          {errors.amount && <span className="text-red-500">Amount is required</span>}
          
    
          <div className='flex flex-col gap-3'>
            <label className="block text-gray-600">Remarks</label>
            <Input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter Remarks"
              {...register("remarks", { required: true })}
            />
          </div>
          {errors.remarks && <span className="text-red-500">Remarks is required</span>}
         
          <div className='flex flex-col gap-3'>
            <label className=" text-gray-600">Course name</label>
            <Input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter course name" 
              {...register("coursename", { required: true })}
            />
          </div>
          {errors.coursename && <span className="text-red-500">Course name is required</span>}
          <button type='submit' className="w-full bg-[#02055A] hover:bg-blue-800 text-white p-3 rounded-lg transition-all">
            Collect Fees
          </button>
        </form>
      </div>
  )
}

export default CollectFees
