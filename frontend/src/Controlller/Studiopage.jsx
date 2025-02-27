import React, { useEffect, useState } from 'react'
import Studio from './Studio';


const Studiopage = () => {
    const [city, setCity] = useState("not");
    
    const [list,setList]=useState();
     const [loding, setLoding] = useState(true);
        
        setTimeout(() => {
            setLoding(false)

        }, 1000)
    
        useEffect(() => {
            fetch("http://localhost:8080/api/studio/fetchcity")
                .then((res) => res.json())
                .then((data) => {
                    setList(data)
                    // console.log(data)
                    setLoding(false)
                })
                .catch((err) => {
                    console.error("fetch in error", err);
                })
    
        }, [city]);


    const handelchange = (e) => {
        e.preventDefault();
        localStorage.setItem("city",e.target.value)
        setCity(e.target.value)

    }
    return (
        <div className='flex flex-col py-5 gap-10 '>

            <div>
                <div className='flex justify-end items-end ml-10'>
                    <select className="select select-accent w-full max-w-xs" onChange={handelchange}>
                        <option disabled  >Select Your City</option>
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
                        list.map((item) => (
                            
                                item.name ===localStorage.getItem("city")
                                ?
                                <option selected >{item.city}</option>
                                :
                                <option  >{item.city}</option>
                            
                           
                        ))
                    )
                    }
                    </select>
                </div>
            </div>
                        {    city==="not"
                            ?

                            <div className='flex items-center justify-center'>
                                <p >{
                                localStorage.getItem("city").length>0 ? setCity(localStorage.getItem("city")):"Select Your City"
                                }
                                 </p>
                            </div>
                            :
            <div>
                <Studio city={city} title="studio" />
            </div>
}

        </div>
    )
}

export default Studiopage
