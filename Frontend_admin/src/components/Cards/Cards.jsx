import { useEffect, useState } from "react";
import { iconsImgs } from "../../utils/images";
import "./Cards.css";
import { format } from "date-fns";
const Cards = ({email,status}) => {
    const accept = () => {
        alert("done")
    }

    const user = localStorage.getItem("admin")

    const [studio, setStudio] = useState();

    useEffect(() => {
        fetch(`http://localhost:8080/api/studio/fetchbooking`)
            .then((res) => res.json())
            .then((data) => {
                setStudio(data)

                // console.log(data)

            })
            .catch((err) => {
                console.error("fetch in error", err);
            })

    }, [studio]);
    // console.log(studio)
    const updates = { status: "confirm" };

    const updateData = async (id) => {
      if (!id) {
        console.error("Invalid ID provided for update.");
        return;
      }
    
      try {
        const response = await fetch(
          `http://localhost:8080/api/studio/updatebooking/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updates),
          }
        );
    
        if (!response.ok) {
          throw new Error(`Failed to update item. Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        alert("Booking confirmed!");
        // window.location.reload(); // (Optional: Better to update UI state instead)
    
        return data;
      } catch (error) {
        console.error("Error updating item:", error);
      }
    };

    const handleDelete = async (id) => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/studio/deletebooking/${id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            //alert('Bill Deleted')
           // navigate("/home");
        // window.location.reload();
          } else {
            console.error("Failed to delete the item.");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };



    return (
        <div className="order" >
            {studio?.map((user) => (
                user.studiogmail===email
                ?
                user.status ==status
                ?
                
                <div className="grid-one-item grid-common grid-c1">
                    <div className="grid-c-title">
                        <h3 className="grid-c-title-text">{user.customername}</h3>
                       

                    </div>
                    <div className="grid-c1-content">
                        <p>{user.email}</p>
                        <p>{user.mobile}</p>
                        <div className="lg-value">{user.address}</div>

                        <div className="card-wrapper">

                        </div>
                        <div className="card-logo-wrapper">
                            <div>
                                <p className="text text-silver-v1 expiry-text">EventStart Date</p>
                                <p className="text text-sm text-white">{format(new Date(user.startdate), "dd-MM-yyyy hh:mm a")}</p>
                            </div>
                            <div>
                                <p className="text text-silver-v1 expiry-text">EventEnd Date</p>
                                <p className="text text-sm text-white">{format(new Date(user.enddate), "dd-MM-yyyy hh:mm a")}</p>
                            </div>
                            
                            {
                                  status =="pending"  
                                  ?   
                         <>
                            <div className={`card-logo `}>
                                <button type="button" class="buttona" onClick={() => updateData(user._id)}>
                                    <span class="buttona__text">Accept</span>
                                    <span class="buttona__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                                </button>
                            </div>
                            <div className="card-logo">

                                <button className="button" onClick={() => handleDelete(user._id)}>
                                    <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                </button>
                            </div>
                            </>
                            :<div></div>
}
                        </div>
                    </div>
                </div>
                :<></>
                :
                <></>
            ))}
        </div>
    )
}

export default Cards
