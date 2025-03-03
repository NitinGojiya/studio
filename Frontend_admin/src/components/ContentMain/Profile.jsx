import React, { useState } from 'react'
import Upload from './Upload'
import "./Profile.css"
import "../Cards/Cards.css"
import Gallery from './Gallery'
import Video from './Video'
import Videogallery from './Videogallery'
const Profile = ({ email }) => {
  const [upload, setUpload] = useState();

  return (
    <div>

      <div className='grid-c1-content txt ' >


        <button className='btn_up' onClick={()=>{setUpload(1)}}>
          <span class="box">
          Photos Upload
          </span>
        </button>

        
        <button className='btn_up' onClick={()=>{setUpload(2)}}>
          <span class="box">
            Video Upload
          </span>
        </button>



      </div>
      <div className='gap'>

      </div>
      <div className='grid-c1-content txt'>
        {
          upload == 1
            ?
            <Upload email={email} />
            : <></>


        }
        {
          upload == 2
            ?
            <Video email={email} />
            : <></>
        }

      </div>
      <div className='gap'>

      </div>
      {
         upload == 1
         ?
      <div className="grid-c1-content">
        <Gallery email={email} />
      </div>
      :<></>
}
{
   upload == 2
   ?
      <div className="grid-c1-content">
        <Videogallery email={email} />
      </div>
      :<></>
}
    </div>
  )
}

export default Profile