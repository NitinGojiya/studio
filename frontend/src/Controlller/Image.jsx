import React, { useEffect, useState } from 'react'
import logo from './Images/download.jpeg'
import axios from 'axios'
const Image = ({email}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/photos")
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, [data]);
  return (
  
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-5">
       {data.map(photo => (
           email=== photo.email
           ?      
        <div key={photo._id}>
          <img
            className="h-40 w-full max-w-full rounded-lg object-cover object-center"
            src={`http://localhost:8080${photo.path}`}
            alt="gallery-photo"
          />
        </div>
        :<></>
      ))}
    </div>
       
   
  )
}

export default Image
