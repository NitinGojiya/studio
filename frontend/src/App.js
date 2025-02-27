import './App.css';
import Navbar from './Controlller/Navbar';
import Home from './Controlller/Home';
import Footer from './Controlller/Footer';
import { Routes, Route } from "react-router-dom"
import Signup from './Controlller/Signup';

import Studiopage from './Controlller/Studiopage';
import Website from './Controlller/Website';
import Test from './Controlller/Test';
import { useState } from 'react';
import Aboutus from './Controlller/Aboutus';
import Service from './Controlller/Service';
import Back from './Controlller/Back';
import Dashboard from './Controlller/Admin/Dashboard'
import User from './Routes/User';
import Admin from './Routes/Admin';
import Bookindetail from './Controlller/Bookindetail';


function App() {
  let l = localStorage.getItem("login")
  const [login, setLogin] = useState(l);
  let userl = localStorage.getItem("user")

  const [admin, setAdmin] = localStorage.getItem("admin")
  const [user, setUser] = useState(userl)

  return (
    
    <>
      
   
    <Navbar login={login} setLogin={setLogin} user={user} setUser={setUser} admin={admin} />
    
    <Routes>
     
      <Route path="/" element={ <Home /> } />
      <Route path="/signup" element={ <Signup/>} />

      <Route path="/studio" element={ login==="false" ?<Signup/>:<Studiopage/>} />
      <Route path="/orderdetails" element={<Bookindetail userl={user} /> }/>

      <Route path="/studioweb"  element={ <Website userl={user} />} />
      <Route path="/aboutus" element={<Aboutus/>} />
      <Route path="/service" element={<Service  />} />
      <Route path="/test" element={<Service/>} />
      
   
    
      
    </Routes>
    <Back/>
    <Footer />
  
    
    
  </>



  );
}

export default App;
