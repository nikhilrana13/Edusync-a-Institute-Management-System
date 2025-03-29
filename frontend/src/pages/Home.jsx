import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [displaytext, setDisplayText] = useState('');
  const navigate = useNavigate();
  const fulltext = "Welcome to EduSync ! Manage Your Institute with Ease ";


  // text animation 
  useEffect(()=>{
    let index = 0;
    const interval = setInterval(()=>{
      if(index < fulltext.length){
        setDisplayText(fulltext.substring(0, index+1));
        index++;      
      } else{
         clearInterval(interval);
         setTimeout(()=>{
           navigate('/login');
         },1000);

      }

    

    },100);

    return () => clearInterval(interval);
  },[])

  // 

 
     
  return (
    <div className='flex justify-center items-center h-screen  bg-[#02055A] '>
       
        <span className='text-2xl sm:text-4xl font-bold leading-10 md:leading-[3.5rem] text-white  text-center w-[90%] max-w-[600px]'>{displaytext}</span>
       
    </div>
  )
}

export default Home
