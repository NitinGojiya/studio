import React from 'react'
import { Routes, Route } from "react-router-dom"
import AHome from '../Controlller/Admin/AHome'
import Dashboard from '../Controlller/Admin/Dashboard'
const Admin = () => {
  return (
  <>
 
      <Routes>
     
     <Route path="/" element={ <Dashboard/> } />
     <Route path="/history" element={ <AHome/> } />
  
     
   </Routes>
  </>
  )
}

export default Admin