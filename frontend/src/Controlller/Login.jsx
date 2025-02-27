import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = ({login,setLogin,user,setUser}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer'); 
    const [error, setError] = useState('');
  
   
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        if (!email || !password) {
            setError('Please fill in both fields');
            return;
        }

        
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        
        setError('');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('User Type:', userType);
        const postData={
            "email":email,
            "password":password
        }
        if(userType.match("customer"))
        {
            try {
                const response = await fetch('http://localhost:8080/api/studio/user', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });
            
                const data = await response.json(); // Parse the response JSON
            
                if (response.ok) {
                    localStorage.setItem("login", "true");
                    // localStorage.setItem("user",data._id);
                    localStorage.setItem("user",data.user._id); // Cookie expires in 7 days
                    setLogin("true");
                    setUser(data.user._id)
                    // console.log(data)
                    // Close modal properly (if using React, consider useRef instead)
                    document.getElementById('my_modal_1')?.close();
                    
                } else {
                    setError(data.message || 'User not Found');
                    // alert(data.message || 'User not found'); // Display server error message if available
                }
            } catch (error) {
                console.error("Error:", error);
                alert('Something went wrong. Please try again.');
            }
        }
       if(userType.match("studioOwner"))
       {
        try {
            const response = await fetch('http://localhost:8080/api/studio/loginstudio', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
        
            const data = await response.json(); // Parse the response JSON
        
            if (response.ok) {
                // localStorage.setItem("login", "true");
                // setLogin("true");
               // navigate('/dashboard', { state: { message: login } });
                // Close modal properly (if using React, consider useRef instead)
                localStorage.setItem("admin","true")
                
                
                const userId = data.user._id // Example ID
                window.open(`http://localhost:5173/?id=${userId}`, "_blank");
                document.getElementById('my_modal_1')?.close();
            } else {
                setError(data.message || 'User not Found');
                // alert(data.message || 'User not found'); // Display server error message if available
            }
        } catch (error) {
            console.error("Error:", error);
            alert('Something went wrong. Please try again.');
        }
       }
        
        
        // console.log(postData);
    //    localStorage.setItem("login","true")
    //    setLogin("true")
    //    document.getElementById('my_modal_1').close()
        //submit form
        
    };

    return (
        <>
            <dialog id="my_modal_1" className="modal text-black">
                <div className="modal-box">
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-5 flex-col items-center justify-center">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Your Email"
                                    className="input input-bordered w-full max-w-xs"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Enter Your Password"
                                    className="input input-bordered w-full max-w-xs"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='flex gap-9'>
                                <div className='flex items-center justify-center gap-5'>
                                    <div>Customer</div>
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
                            </div>
                            {error && <div className="text-red-500">{error}</div>}
                            <div>
                                <button type="submit" className="btn btn-outline btn-accent" >Login</button>
                            </div>
                            <div >
                                <a href=''>Forgot Password ?</a><br /><a href='/signup'>Create Account ?</a>
                            </div>
                        </div>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-outline btn-accent">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Login;
