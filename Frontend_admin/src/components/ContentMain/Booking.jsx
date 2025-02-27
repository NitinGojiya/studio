import React from 'react'
import Cards from '../Cards/Cards'

const Booking = ({email}) => {
  const userId=localStorage.getItem("admin")
  return (
    <div>
     <Cards email={email} status={"pending"}/>
    </div>
  )
}

export default Booking