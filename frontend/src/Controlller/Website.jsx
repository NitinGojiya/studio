import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Images from './Images/logo3.png';
import Image from './Image';
import Video from './Video';
import Booking from './Booking';
import Social from './Social';
import './Css/Background.css'
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

            <div className='bgwebsite'>
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



                                <div className="p-10">
                                    <div className="flex gap-5 justify-center items-center">
                                        <div>
                                        <img height="500px" width="200px"
                                            src={`http://localhost:8080${studio.imageUrl}`}
                                            className="image-full rounded-lg shadow-2xl h-[300px] w-[400px]" />
                                        </div>
                                      
                                        <div className='text-wrap w-[500px]'>
                                            <h1 className="md:text-3xl font-bold text-white text-wrap">Welcome to {studio.name} Studio – Capturing Your Precious Moments</h1>
                                            <p className="py-6 text-3xl font-bold text-white text-wrap">
                                             Mobile:   {studio.mobile}
                                            </p>
                                            <p className='font-bold text-white text-wrap'>
                                            At {studio.name} , we specialize in bringing your memories to life through high-quality photography and videography. Whether it’s a wedding, birthday, corporate event, or a personal photoshoot, we are here to create timeless visuals that tell your unique story.
                                            </p>
                                            <button className="btn btn-outline btn-accent mt-5" onClick={()=>document.getElementById('my_modal_5').showModal()}>Book Now</button>
                                            <Booking userl={userl} name={studio.name}  email={studio.email} id={studio._id} smobile={studio.mobile}/>
                                        </div>
                                      
                                    </div>
                                    <div className='m-10'>
                                            <Social/>
                                    </div>
                                  {/* imagesectin */}
                                    <div className='mt-10'>
                                       <div className=''>
                                        <p className='text-3xl font-bold text-white border-b-4'>Photos Demo</p>
                                        </div>
                                        <div>
                                            <Image  email={studio.email}/>
                                        </div>
                                    </div>
                                     {/* video Section End */}
                                            {/* imagesectin */}
                                    <div className='mt-10'>
                                       <div className=''>
                                        <p className='text-3xl font-bold text-white  border-b-4'>Video's Demo</p>
                                        </div>
                                        <div>
                                           <Video email={studio.email}/>
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
