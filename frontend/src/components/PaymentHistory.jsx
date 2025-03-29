import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import axios from 'axios'
import { Loader2 } from 'lucide-react'


const PaymentHistory = () => {
   const[payment,setPayment] = useState([])
   const[loading,setLoading] = useState(false)

    useEffect(()=>{
       const fetchPaymentHistory = async()=>{
        try {
          setLoading(true)
          const response = await axios.get("http://localhost:3000/fees/paymenthistory",{withCredentials:true})
          if(response.data){
            // console.log(response.data);
            setPayment(response.data.paymenthistory)
          }

        } catch (error) {
          console.error(error?.response?.data?.message || "Something went wrong");
          
        }finally{
          setTimeout(() => {
            setLoading(false)
          },1000);
        }
       }
       fetchPaymentHistory()
    },[])
  return ( 
    <div className=' w-full p-5 '>
        <h1 className='text-2xl font-bold'>Payment History</h1>
        <div className="student table w-full mt-12">
        {loading ? (
          <Loader2 className='mx-auto w-30 h-40 animate-spin' />
        ) : payment.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Date of Payment</TableHead>
                <TableHead className="hidden md:table-cell">Amount</TableHead>
                <TableHead className="text-right">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payment.map((pay) => (
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
          <p className='text-center mt-12 text-gray-500'>No students found</p>
        )}
        
         
      
    </div>
      
    </div>
  )
}

export default PaymentHistory
