import React, { useEffect, useState } from 'react';
import Images from './Images/logo3.png';
import { useNavigate } from 'react-router-dom';

const Studio = ({ city, title }) => {
    const [stud, setStudio] = useState();
    const [loding, setLoding] = useState(true);
    setTimeout(() => {
        setLoding(false)
    }, 1000)

    useEffect(() => {
        fetch("http://localhost:8080/api/studio/fetchstudio")
            .then((res) => res.json())
            .then((data) => {
                setStudio(data)
                // console.log(data)
                setLoding(false)
            })
            .catch((err) => {
                console.error("fetch in error", err);
            })

    }, [stud]);
    const navigate = useNavigate();
    const handelnav = (id) => {
        navigate('/studioweb', { state: { message: id } });
    }
    return (
        <div className='flex justify-center bg-slate-900 p-10'>
            <div className=" grid grid-cols-1 md:grid-cols-5 gap-4">

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
                            stud.map((item) => (
                                item.city === city
                                    ?
                                    <div key={item._id} className="card bg-slate-700 w-[200px]  shadow-xl ">
                                        <figure>
                                            <img
                                                src={`http://localhost:8080${item.imageUrl}`}
                                                alt={item.name}
                                                className="h-[150px]"
                                            />
                                        </figure>
                                        <div className="card-body text-white font-bold">
                                            <h2 className="card-title">{item.name}</h2>
                                            <p>{item.serviceType}</p>
                                          
                                            <p>{item.address}</p>
                                            <p>{item.city}</p>
                                            <div className="card-actions justify-center">

                                                <button className="btn btn-outline btn-success text-white" onClick={() => handelnav(item._id)} >View Details</button>
                                            </div>
                                        </div>
                                    </div>
                                    : <></>

                            ))
                        )
                }

            </div>
        </div>
    );
};

export default Studio;
