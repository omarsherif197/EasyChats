import './index.css';
import React, { useEffect, useState } from "react";
import {useNavigate,Link} from 'react-router-dom'
import {loginRoute} from "./utils/APIRoutes"
import axios from 'axios';

function LoginBox() {

    const [email,setEmail] = useState("")
    const [usernameOrEmail,setUsernameOrEmail]= useState(true)
    const [emailError,setEmailError] = useState(false)
    const [serverError,setServerError] = useState("")

    const [username, setUsername] = useState("")

    const [password,setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        if (localStorage.getItem('chat-app-user')){
            navigate('/Rooms');
        }
    },[])
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const {data} = await axios.post(loginRoute,{
            username,
            email,
            password,
            usernameOrEmail,
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

    const handleClick = () =>{
        setUsernameOrEmail(!usernameOrEmail);
    }

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

    return(
        <div className="join-container">
			<header className="join-header">
				<h1><i className="fas fa-smile"></i> EasyChats</h1>
			</header>
			<main className="join-main">
				
			
        <form onSubmit={handleSubmit} >

                    {
                         usernameOrEmail ?
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
                        <p onClick={handleClick}> Login with Email?</p>
					    </div>
                        :
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
                    <p onClick={handleClick}> Login with Username?</p>
                    </div>
                       
                    }
				
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
					{
                        serverError.length>0 &&
                         <div className='error-message-server' > {serverError} </div>
                    }

					<button type="submit" className="btn" disabled={emailError}>Join Chat</button>
                    <span>Don't have an account? <Link to="/Register">Sign up</Link></span>
				</form>
                </main>
		</div>

    )    

}

export default LoginBox;

