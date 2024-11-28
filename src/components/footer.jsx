import React, { useState } from 'react'

const Footer = () => {
 

  return (
    <footer className='h-[13vh] bg-slate-800 text-white flex flex-col justify-center items-center '>
          <div className="log font-bold gap-2 ">
            <span className='text-red-700 '>&lt;</span>
            <span className='text-2xl' >Lock</span>
            <span className='text-red-500 text-xl' >SHIELD/&gt;</span>
           </div>
            <div className='flex flex-row ' >
          <div className='mb-1'> Created By </div>
           <a href="https://github.com/Farhaanahmad2" className='hover:text-slate-400 px-2' target="_blank"  > <i className="fa-brands fa-github"></i> Farhan Ahmad</a>
           </div>
            
           
    </footer>
  )
}

export default Footer