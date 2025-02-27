import React from 'react'
import './Back.css'
const Back = () => {
   
    const handelscroll=(e)=>{
     
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <div className='back fixed right-0 bottom-0 bg-white z-50' onClick={handelscroll}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

        </div>
    )
}

export default Back
