import './index.css';
import React, { useEffect, useState } from "react";

function UserList(props) {
    const[room,setRoom] = useState(props.roomname)
    const[userList,setUserList] = useState([])
    const socket = props.socket
    useEffect(()=>{
        socket.on('roomUsers',({room,users})=>{
            setRoom(room);
            setUserList(users);
        })

        return () =>{
            socket.off('roomUsers')
        }

    },[]);

    return (
        <div className="chat-sidebar">
            <h3><i className="fas fa-comments"></i> Room Name:</h3>
            <h2 id="room-name">{room}</h2>
            <h3><i className="fas fa-users"></i> Users</h3>
            <ul id="users">
                {userList.map(user => <li key={user.username}>{user.username}</li>)}
            </ul>
        </div>
        
    )


}

export default UserList