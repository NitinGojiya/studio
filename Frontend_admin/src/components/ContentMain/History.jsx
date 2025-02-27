import React from 'react'
import Cards from '../Cards/Cards'

const History = ({email}) => {
  return (
    <div>
       
    <Cards email={email} status={"confirm"}/>
   </div>
  )
}

export default History