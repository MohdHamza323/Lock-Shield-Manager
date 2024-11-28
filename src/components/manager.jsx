import React, { useEffect, useRef, useState } from 'react'
import "./manager.css"
import { ToastContainer, toast } from 'react-toastify';
import uuid4 from "uuid4";

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {


    // let[eye,seteye]=useState(true);
    // const url="icons/eye.png";
    // const showpassword=()=>{
    //     if(eye==true)
    //     {
    //         seteye(false)    

    //     }
    //     else{
    //         seteye(true)
    //     }

    // }

    const ref = useRef()
    const passwordRef = useRef()
    let [form, setform] = useState({ site: "", username: "", password: "" })
    let [passwordArray, setpasswordArray] = useState([])

    //READ
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");

        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copytext = (text) => {
        toast('Copy to clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // style: {
            //     background: "#C6B3F9", // Example: light peach color.
            //     color: "white" // Text color.
            //   }

        });
        navigator.clipboard.writeText(text)
    }

    const showpassword = () => {
        if (ref.current.src.includes('icons/eye.png')) {
            passwordRef.current.type = "text"
            ref.current.src = 'icons/hidden.png'
        }
        else {
            ref.current.src = 'icons/eye.png'
            passwordRef.current.type = "password"
        }
    }

    //CREATE
    const savepassword = (e) => {
      
        setpasswordArray([...passwordArray, {...form,id: uuid4()}]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuid4()}]));
        setform({ site: "", username: "", password: "" });
        // localStorage.clear();
    }

    //DELETE
    const DeletePassword = (idd) => {
        // setpasswordArray([...passwordArray, {...form,id: uuid4()}]);
        console.log(idd)
        const con=confirm("Do You Want to  Delete this PASSWORD")
        if(con)
        {
        setpasswordArray(passwordArray.filter((item)=>item.id!=idd))  //deletion from passwordArray 
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=>item.id!=idd)));  //deletion from local storage
        }
        
    }

    //UPDATE
    const EditPassword = (idd) => {
        
        console.log(idd)
        const item=passwordArray.filter((item)=>item.id=== idd)
        setform(item[0]);
        setpasswordArray(passwordArray.filter((item)=>item.id!=idd))  //deletion from passwordArray 
        
        
    }



    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }



    return (
        <>


            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />


            <div className="inset-0 -z-10 min-h-[80vh] w-full  bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">


                {/* [calc(100vh-4rem)] */}

                <div className=" px-0   md:mycontainer    ">
                    
                    <div className='text-center'>
                        <span className='text-red-500 font-bold text-2xl'>&lt;</span>
                        <span className='text-3xl font-bold text-slate-800' >Lock</span>
                        <span className='text-red-500 text-2xl font-bold' >SHIELD/&gt;</span>
                        <p className='text-red-500' >Your own Password Manager</p>
                    </div>


                    <div className="text-white flex flex-col  p-4 gap-3 items-center ">
                        <input type="text" value={form.site} onChange={handlechange} name="site" id="site" className='border border-slate-500 rounded-full w-full px-3 py-1 text-black' placeholder='Enter Website URL' />

                        <div className="flex flex-col md:flex-row mx-auto justify-between  gap-2 w-full">
                            <input value={form.username} onChange={handlechange} name="username" className='border border-slate-500 rounded-full  w-full px-3 py-1 text-black' type="text" placeholder='Enter Username ' />

                            <div className='relative md:w-1/2'>
                                <input value={form.password} ref={passwordRef} onChange={handlechange} name="password" className='border border-slate-500 rounded-full w-full px-3 py-1 text-black' type="password" placeholder='Enter Password' id="" />
                                <span className='absolute right-2 top-2  text-black cursor-pointer' onClick={showpassword}>

                                    {/* <img src={eye ? "icons/eye.png" :"icons/hidden.png"} alt="" className='w-4 h-4' /> */}

                                    <img ref={ref} src="icons/eye.png" alt="" className='w-4 h-4' />

                                </span>
                            </div>

                        </div>

                        <button onClick={savepassword} className='flex  justify-center items-center bg-slate-800 gap-1  px-5 py-1 rounded-full hover:bg-slate-700 ' >
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover" colors="secondary:white,primary:white" >

                            </lord-icon>
                            Save</button>

                    </div>

                    <div className="paswords px-2 ">
                        <h2 className='font-bold text-2xl py-3 px-1'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div className='px-1'>No Password to Show</div>}

                        {passwordArray.length != 0 && 
                        
                        <table className="table-auto w-full md:mytable rounded-xl  border-r border-slate-200  overflow-hidden" >
                            <thead className='bg-slate-800 text-white  '>
                                <tr >
                                    <th className='py-2'>Website</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2 '>Actions</th>
                                </tr>
                            </thead>
                            <tbody  >
                                {passwordArray.map((items, index) => {
                                    return <tr key={index} className='border-t border-slate-300'>


                                        <td className=' py-1  text-center' >
                                            <div className='flex flex-row justify-center'  >
                                                <a href={items.site} target="_blank" >{items.site}</a>
                                                <div className='lordiconcopy cursor-pointer' onClick={() => { copytext(items.site) }} >
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px", "paddingTop": "4px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="click" colors="secondary:black,primary:#1E293B" >

                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td >


                                        <td className=' py-1  text-center'>
                                            <div className='flex flex-row justify-center'>
                                                <span>{items.username}</span>
                                                <div className='lordiconcopy cursor-pointer' onClick={() => copytext(items.username)}>
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px", "paddingTop": "4px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="click" colors="secondary:black,primary:#1E293B" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className=' py-1  text-center '>
                                            <div className='flex flex-row justify-center'>
                                                <span>{items.password}</span>
                                                <div className='lordiconcopy cursor-pointer' onClick={() => copytext(items.password)}>
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px", "paddingTop": "4px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="click" colors="secondary:black,primary:#1E293B" >

                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>


                                        <td className=' py-1  text-center '>
                                            <div className='flex flex-row justify-center'>
                                                <div className='lordiconEdit mx-1 cursor-pointer' onClick={() => EditPassword(items.id)} >
                                                <lord-icon
                                                        style={{ width: "25px", height: "25px", "paddingTop": "4px" }}
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover" colors="secondary:black,primary:#1E293B" >
                                                    </lord-icon>

                                                </div>
                                                <div className='lordiconDelete mx-1 cursor-pointer' onClick={() => DeletePassword(items.id)}>
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px", "paddingTop": "4px" }}
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover" colors="secondary:black,primary:#1E293B" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>



                                    </tr>
                                })}
                            </tbody>
                        </table>}
                    </div>

                </div>

            </div>


        </>
    )
}

export default Manager