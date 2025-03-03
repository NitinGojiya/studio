
import React, { useEffect, useState } from 'react'

import axios from 'axios'
const Video = ({email}) => {

    const [url, setUrl] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/videos")
            .then(res => setUrl(res.data))
            .catch(err => console.error(err));
    }, [url]);
    return (
        <div className='flex flex-wrap   gap-5 w-[1200px] items-center justify-center'>
            {
                url.map((item) => (
                    email=== item.email
                    ?      
                    <div>
                               
                    <video width="500" height="500" controls>
                        <source src={item.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                :<></>
                    
                ))

            }

        </div>
    )
}

export default Video
