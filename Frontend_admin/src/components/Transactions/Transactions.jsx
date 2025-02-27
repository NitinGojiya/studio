import "./Transactions.css";
import { transactions } from "../../data/data";
import { iconsImgs } from "../../utils/images";
import { useEffect, useState } from "react";

const Transactions = () => {
    const [studio,setStudio]=useState();
    const userId=localStorage.getItem("admin")
     useEffect(() => {
            fetch(`http://localhost:8080/api/studio/fetchstudio1/${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    setStudio(data)
                    
                     console.log(data)
    
                })
                .catch((err) => {
                    console.error("fetch in error", err);
                })
    
        }, []);
  return (
    <div className="grid-one-item grid-common grid-c2">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Profile</h3>
            <button className="grid-c-title-icon">
                <img src={ iconsImgs.plus } />
            </button>
        </div>

        <div className="grid-content">
            <div className="grid-items">
                {
                   
                        <div className="grid-item" >
                            <div className="grid-item-l">
                                <div className="avatar img-fit-cover">
                                    <img  src={`http://localhost:8080${studio?.imageUrl}`}  alt="" />
                                </div>
                                <p className="text">{ studio?.email } <span>Email</span></p>
                                <p className="text">{ studio?.name } <span>Name</span></p>
                            </div>
                            <div className="grid-item-r">
                                <span className="text-scarlet"> { studio?.mobile }</span>
                            </div>
                           
                        </div>
                    
                }
            </div>
        </div>
    </div>
  )
}

export default Transactions
