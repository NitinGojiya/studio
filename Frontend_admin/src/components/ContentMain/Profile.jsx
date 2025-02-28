import React from 'react'
import Upload from './Upload'
import "./Profile.css"
import "../Cards/Cards.css"
import Gallery from './Gallery'
const Profile = ({email}) => {
  return (
    <div>

   
    <div className='grid-c1-content txt'>
        <Upload email={email}/>
    </div>
    <div className='gap'>

    </div>
    <div className="grid-c1-content">
        <Gallery email={email}/>
    </div>
    </div>
  )
}

export default Profile