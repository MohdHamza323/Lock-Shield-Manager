 import React from 'react'
 
 const Navbar = () => {
   return (
     <nav className='bg-slate-800 flex z-20  justify-evenly h-[9vh] items-center px-4 text-white  w-full'>
        <div className="log font-bold gap-2 ">
            <span className='text-red-700 '>&lt;</span>
            <span className='text-xl' >Lock</span>
            <span className='text-red-500' >SHIELD/&gt;</span>
           </div>
        <button className='text-white bg-red-700 flex px-2 py-1 gap-2 justify-center ring-white ring-1 items-center rounded-3xl hover:bg-red-600'>
              <img className='invert text-white w-8' src="icons/github.svg" alt="" /> 
              GitHub
          </button>
     </nav>
   )
 }
 
 export default Navbar