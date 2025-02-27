import React from 'react'

import img from './Images/logo2.png'
import './Css/Background.css'

const Home = () => {
  return (
    <>
    
    <div className="bgback flex-col  md:flex md:flex-row  items-center justify-center py-10 px-4 gap-10">

        <div className='text-2xl '>
          <p className='text-5xl font-serif text-white'><span className='text-red-600'>W</span>e Provide Studio <span className='text-red-500'>B</span>ooking</p>
          <p className='text-3xl text-white'> "Capture Moments, Create Memories."</p>
          <p className='text-white'>Easy Way To Grow Your Business </p>
          
        </div>
       
        <div className='bg-home h-[400px] w-[400px] text-white text-4xl shadow-gray-700 shadow-md homecard'>
          <img src={img} className='image-full h-[400px] w-[400px]' alt='logo'></img>
        </div>
       
    </div>
    </>
  )
}

export default Home
