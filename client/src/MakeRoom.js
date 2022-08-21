import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {makeRoomRoute} from "./utils/APIRoutes"

function MakeRoom() {

    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [roomname, setRoomName] = useState("")
    const [passwordError,setPasswordError] = useState(false)
    const [serverError,setServerError] = useState("")

    const navigate = useNavigate()

    const handleChangeConfirmPassword = (event) =>{
        if (password != event.target.value){
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }

        setConfirmPassword(event.target.value)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {data} = await axios.post(makeRoomRoute,{
            roomname,
            password
        });

        if (data.status == false){
            setServerError(data.msg) 
            setTimeout(()=>{
             setServerError("")
            },5000)
 
         }
         
         if (data.status == true){
            navigate('/Rooms')
        }

    }
    return(
        <div className="join-container">
			<header className="join-header">
				<h1><i className="fas fa-smile"></i> EasyChats</h1>
			</header>
			<main className="join-main">
				
			
        <form onSubmit={handleSubmit} >

                        <div className="form-control">
						<label htmlFor="roomname">Room name</label>
						<input
							type="text"
							name="roomname"
							id="roomname"
							placeholder="Enter room name..."
							required
                            value={roomname}
                            onChange= {(e) => setRoomName(e.target.value)}
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

					<button type="submit" className="btn" disabled={passwordError}>Make Room</button>
				</form>
                </main>
		</div>
    )
}
export default MakeRoom