import React from 'react'
import TextRotation from './TextRotation'

const Navbar = () => {
    return (
        <div className='navbar flex justify-between items-center p-3 h-25 w-full'>
            {/* Left-side of the navbar */}
            <div className='flex justify-between items-center'>
                <div className="bg-[url('https://images.unsplash.com/photo-1768463852001-811ead5844fb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-18 w-18 rounded-full m-5 " />
                <h1 className='text-white text-2xl'><TextRotation /></h1>
            </div>


            {/* Right-side of the navbar */}
            <div className=''>
                <ul className='flex justify-between gap-10 px-10 mx-5'>
                    <button className='text-black bg-cyan-200 px-2 text-xl rounded cursor-pointer'>Resume</button>
                    <button className='text-black bg-green-200 px-2 text-xl rounded cursor-pointer'>Send Email</button>
                </ul>
            </div>

        </div >
    )
}

export default Navbar
