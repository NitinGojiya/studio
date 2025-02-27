import React, { useEffect, useState } from 'react'
import axios from "axios";
const Signup = () => {
    const [userType, setUserType] = useState('customer');
    const [city, setCity] = useState("not");

    const handelchange = (e) => {
        e.preventDefault();
        setCity(e.target.value)
    }

    const [list, setList] = useState();
    const [loding, setLoding] = useState(true);
    setTimeout(() => {
        setLoding(false)
    }, 1000)

    useEffect(() => {
        fetch("http://localhost:8080/api/studio/fetchcity")
            .then((res) => res.json())
            .then((data) => {
                setList(data)
                // console.log(data)
                setLoding(false)
            })
            .catch((err) => {
                console.error("fetch in error", err);
            })

    });
    const handelsubmitlogin = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const address = e.target.address.value;
        const mobile = e.target.mobile.value;
        const password = e.target.password.value;
        const email = e.target.email.value;
        const signupdata =
        {
            "name": name,
            "address": address,
            "password": password,
            "mobile": mobile,
            "email": email,

        }


        try {
            const respose = await fetch('http://localhost:8080/api/studio/create',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signupdata)

                }
            );
            if (!respose.ok) {
                throw new Error(`HTTP error ! Status: ${respose.status}`);
            }
            e.target.name.value = "";
            e.target.address.value = "";
            e.target.mobile.value = "";
            e.target.password.value = "";
            e.target.email.value = "";
            // const sdata=await respose.json();
            document.getElementById('my_modal_1').showModal()
            // console.log(sdata)
        } catch (error) {
            console.log("errro", error)
        }

        //  console.log(signupdata)

    }

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Store selected file in state
    };

    const [votp, setvOtp] = useState(false);
    const [email, setEmail] = useState();
    const handelsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("stuidoname", e.target.stuidoname.value);
        formData.append("city", e.target.city.value);
        formData.append("password", e.target.password.value);
        formData.append("mobile", e.target.mobile.value);
        formData.append("email", e.target.email.value);
       
        formData.append("address", e.target.address.value);
        formData.append("file", file); // Image file
        // setOtpfield(true)
       
        if (votp) {
            try {
                const response = await fetch("http://localhost:8080/api/studio/createstudio", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                e.target.reset();
                setFile(null);
                document.getElementById("my_modal_1").showModal();
            } catch (error) {
                console.log("Error:", error);
            }
        }
       
    };

    const changeemail=(e)=>{
        setEmail(e.target.value)
    }
    const sendotp =async(e)=>{
        e.preventDefault();
        if(email)
        {
            try {
                const response = await axios.post("http://localhost:8080/send-otp", { email });
                if (response.data.success) {
                   
                    alert("OTP sent! Check your email.");
                    document.getElementById("my_modal_3").showModal();
                }
            } catch (error) {
                alert("Failed to send OTP.");
            }
           
        }
        else{
            alert("input email ")
        }
    }
    const [otp,setOtp]=useState();
    const otpverify =async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/verify-otp", { email, otp });
            if (response.data.success) {
                alert("OTP verified successfully!");
                setvOtp(true)
                document.getElementById("my_modal_3").close();
            } else {
                alert("Invalid OTP. Try again.");
            }
        } catch (error) {
            alert("Verification failed.");
        }
        
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='flex flex-col gap-8 mt-10'>
                <div>
                    <p className="text-3xl"> Signup Page</p>
                </div>
                <div className='flex gap-5'>
                    <div className='flex items-center justify-center gap-5'>
                        <div>
                            Studio Owner
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="userType"
                                className="radio radio-warning"
                                checked={userType === 'studioOwner'}
                                onChange={() => setUserType('studioOwner')}
                            />
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-5'>
                        <div>
                            Customer
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="userType"
                                className="radio radio-success"
                                checked={userType === 'customer'}
                                onChange={() => setUserType('customer')}
                            />
                        </div>
                    </div>
                </div>

                <div>

                    {
                        userType === "customer" ?
                            <form onSubmit={handelsubmitlogin} className='space-y-3'>
                                <div className=''>
                                    <div className='flex flex-col gap-5 pb-5'>
                                        <div>
                                            <input type="text" placeholder="Your Name " name='name' className="input input-bordered w-full max-w-xs" />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Your Mobile " name='mobile' className="input input-bordered w-full max-w-xs" />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Email " name='email' className="input input-bordered w-full max-w-xs" />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Password " name='password' className="input input-bordered w-full max-w-xs " />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="address " name='address' className="input input-bordered w-full max-w-xs" />
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <button className='btn btn-outline btn-success'>Signup</button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                            :
                            <div className='flex flex-col gap-5 py-5'>
                                <form onSubmit={handelsubmit} className='space-y-3'>
                                    <div >
                                        <input type="text" placeholder="Your Studio " className="input input-bordered w-full max-w-xs" name='stuidoname' />
                                    </div>
                                    <div>
                                        <select className="select select-warning w-full max-w-xs" name='city' onChange={handelchange}>
                                            <option disabled selected className='text-black'>Select Your City</option>
                                            {

                                                loding ?
                                                    (
                                                        <div>

                                                            <span className="loading loading-spinner text-warning"></span>

                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        list.map((item) => (
                                                            <option>{item.city}</option>
                                                        ))
                                                    )
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" name="mobile" placeholder="Your Mobile " className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div>
                                        <input type="text" name="email" placeholder="Email " onChange={changeemail} className="input input-bordered w-full max-w-xs" />
                                    </div>


                                    <div>
                                        <input type="text" name="password" placeholder="Password " className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div>
                                        <input type="text" name='address' placeholder="office address" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div>
                                        <input type="file" name='file' className="file-input file-input-bordered file-input-warning w-full max-w-xs" onChange={(e) => setFile(e.target.files[0])} />
                                    </div>
                                    <div className='flex items-center justify-center'>
                                      { votp ? <button className='btn btn-outline btn-warning' >Signup</button>:<></>}
                                    </div>
                                </form>
                                <div>
                                    {
                                        votp ===false
                                        ?
                                <button className='btn btn-outline btn-warning' onClick={sendotp}>send otp</button>
                                   :<></>
                            }
                                </div>

                                {/* otp box */}
                                
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <h3 className="font-bold text-lg">Verify Otp</h3>
                                        <h3 className="font-bold text-lg">{email}</h3>
                                        <input type='text' name='otp' className='input input-bordered w-full max-w-xs' onChange={(e)=>{setOtp(e.target.value)}} ></input>
                                        <button className='btn btn-outline btn-warning' onClick={otpverify}>Verify</button>
                                    </div>
                                </dialog>
                                {/* otp box end */}

                            </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Signup
