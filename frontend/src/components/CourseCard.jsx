import React from 'react'

const CourseCard = ({title,price,image}) => {
    return (
        <div className='max-w-[20rem] border rounded-md shadow-md gap-3 p-2 px-3 overflow-hidden hover:scale-110 transition ease-in-out '>
            <div className='relative bg-cover bg-no-repeat bg-center '>
                <img src={image} lazyloading="true" alt="course imge" className='w-full h-full rounded-md' />
            </div>
            <div className='flex flex-col p-1 gap-4 mt-2 '>
                <span className='text-[1rem] sm:text-[1.2rem]  text-black font-bold'>{title}</span>
                <p className='text-[1rem] text-[#6A6A6A] font-[500]'>Rs,{price}</p>
            </div>
        </div>
    )
}

export default CourseCard
