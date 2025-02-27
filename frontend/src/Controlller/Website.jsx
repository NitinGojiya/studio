import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Images from './Images/logo3.png';
import Image from './Image';
import Video from './Video';
import Booking from './Booking';
const Website = ({userl}) => {
    const [studio, setStudio] = useState();
    const [loding, setLoding] = useState(true);
    setTimeout(() => {
        setLoding(false)
    }, 1000)
    const location = useLocation();
    const { message } = location.state || {}; // 'message' is the studio name passed
    useEffect(() => {
        fetch(`http://localhost:8080/api/studio/fetchstudio1/${message}`)
            .then((res) => res.json())
            .then((data) => {
                setStudio(data)
                setLoding(false)
                // console.log(data)

            })
            .catch((err) => {
                console.error("fetch in error", err);
            })

    }, [message]);
    //  console.log(studio)
    return (
        <>

            <div className=''>
                <div className=" ">

                    {
                        loding ?
                            (
                                <div>
                                    {/* <span className="loading loading-ring loading-xs"></span>
                                        <span className="loading loading-ring loading-sm"></span> */}
                                    <span className="loading loading-spinner text-accent"></span>
                                    {/* <span className="loading loading-ring loading-md"></span>
                                        <span className="loading loading-ring loading-lg"></span> */}
                                </div>
                            )
                            :
                            (



                                <div className="hero bg-base-200 min-h-screen flex flex-col">
                                    <div className="hero-content flex-col lg:flex-row-reverse">
                                        <img height="200px" width="200px"
                                            src={`http://localhost:8080${studio.imageUrl}`}
                                            className="max-w-sm rounded-lg shadow-2xl" />
                                        <div>
                                            <h1 className="md:text-5xl font-bold">{studio.name}</h1>
                                            <p className="py-6">
                                                {studio.address}
                                            </p>
                                            <button className="btn btn-outline btn-accent" onClick={()=>document.getElementById('my_modal_5').showModal()}>Book Now</button>
                                            <Booking userl={userl} name={studio.name}  email={studio.email} id={studio._id} smobile={studio.mobile}/>
                                        </div>

                                    </div>
                                  {/* imagesectin */}
                                    <div className='mt-10'>
                                       <div className=''>
                                        <p className='text-3xl font-bold'>Photos Demo</p>
                                        </div>
                                        <div>
                                            <Image/>
                                        </div>
                                    </div>
                                     {/* video Section End */}
                                            {/* imagesectin */}
                                    <div className='mt-10'>
                                       <div className=''>
                                        <p className='text-3xl font-bold'>Video's Demo</p>
                                        </div>
                                        <div>
                                           <Video/>
                                        </div>
                                    </div>
                                     {/* video Section End */}
                                  
                                </div>




                            )
                    }

                </div>
            </div>





        </>
    )
}

export default Website
