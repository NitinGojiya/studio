import React from 'react'
import ReactPlayer from 'react-player'
const Video = () => {
    const url = [
        {
            "link": "https://youtu.be/H86KGFJ9Xtc?si=VxJHVIuy4gfnyNd0",
        },
     
    ]
    return (
        <div className='flex flex-wrap   gap-5 w-[1200px] items-center justify-center'>
            {
                url.map((item) => (
                   
                        <ReactPlayer  url={item.link} />
                    
                ))

            }

        </div>
    )
}

export default Video
