import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { registerRoute } from "./utils/APIRoutes";

function Register(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [username, setUsername] = useState("")
    const [emailError,setEmailError] = useState(false)
    const [passwordError,setPasswordError] = useState(false)
    const [serverError,setServerError] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        if (localStorage.getItem('chat-app-user')){
            navigate('/Rooms');
        }
    },[])
    
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleChangeEmail = (event) => {
        if (!isValidEmail(event.target.value) && event.target.value!==""){
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        setEmail(event.target.value)
    }

    const handleChangeConfirmPassword = (event) =>{
        if (password != event.target.value){
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }

        setConfirmPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {data} = await axios.post(registerRoute,{
            username,
            email,
            password
        });

        if (data.status == false){
           setServerError(data.msg) 
           setTimeout(()=>{
            setServerError("")
           },5000)

        }

        if (data.status == true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user));
            navigate('/Rooms')
        }
    }

    return(
        <div className="join-container">
        <header className="join-header">
            <h1><i className="fas fa-smile"></i> EasyChats</h1>
        </header>
        <main className="join-main">
            <form onSubmit={handleSubmit}>
            
            <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input
							type="text"
							name="email"
							id="email"
							placeholder="Enter email..."
							required
                            value={email}
                            onChange={handleChangeEmail}
						/>
                        {
                            emailError &&
                             <div className='error-message' > Please enter a valid email address! </div>
                    }
            </div>

            <div className="form-control">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Enter username..."
							required
                            value={username}
                            onChange= {(e) => setUsername(e.target.value)}
						/>
					</div>
            
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password..."
                    required
                    value={password}
                    onChange= {(e) => setPassword(e.target.value)}
                />
			</div>

            <div className="form-control">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm password..."
                    required
                    value={confirmPassword}
                    onChange= {handleChangeConfirmPassword}
                />
                {
                            passwordError &&
                            <div className='error-message' > Passwords do not match! </div>
                    }
			</div>
            {
                        serverError.length>0 &&
                         <div className='error-message-server' > {serverError} </div>
                    }
            <button type="submit" className="btn" disabled={emailError||passwordError}> Register</button>
            <span>Already have an account? <Link to="/Login">Login</Link></span>
            </form>
        </main>
        </div>

    )
}

export default Register