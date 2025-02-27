import "./Content.css";
import ContentTop from '../../components/ContentTop/ContentTop';
import ContentMain from '../../components/ContentMain/ContentMain';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Booking from "../../components/ContentMain/Booking";
import { useLocation } from "react-router-dom";
import Home from "../../components/ContentMain/Home";
import { useEffect, useState } from "react";
import History from "../../components/ContentMain/History";
import Transactions from "../../components/Transactions/Transactions";
const Content = () => {
  
const queryParams = new URLSearchParams(window.location.search);
const userId = queryParams.get("id");
localStorage.setItem("adminlogin","true")


if(userId != null)
{
  
  localStorage.setItem("admin",userId)
  
}


  

const user=localStorage.getItem("admin")
// console.log("User ID:", userId);
const [studio,setStudio]=useState();

 useEffect(() => {
        fetch(`http://localhost:8080/api/studio/fetchstudio1/${user}`)
            .then((res) => res.json())
            .then((data) => {
                setStudio(data)
                
                //  console.log(data)

            })
            .catch((err) => {
                console.error("fetch in error", err);
            })

    }, []);


  return (
 

    <div className='main-content'>
      <ContentTop />
     <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<ContentMain  />} />
        <Route path="/booking" element={<Booking  email={studio?.email}/>} />
        <Route path="/History" element={<History  email={studio?.email}/>} />
        <Route path="/profile" element={<Transactions user={user}/>} />
        <Route path="/Settings" element={<ContentMain />} />
      </Routes>
    </Router>
    </div>
    

  )
}

export default Content
