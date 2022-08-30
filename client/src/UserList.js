import './index.css';
import React, { useEffect, useState } from "react";
import {getRoomUsers} from "./utils/APIRoutes"
import axios from 'axios'

function UserList(props) {
    const[room,setRoom] = useState(props.roomname)
    const[userList,setUserList] = useState([])
    const socket = props.socket

    const fetchUsers = async () => {
        const {data} = await axios.post(getRoomUsers,{
            roomname: room,
        })
        setUserList(data.room.users)
    }

    useEffect(()=>{
        socket.on('roomUsers', () =>{
            fetchUsers()
        })

        return () =>{
            socket.off('roomUsers')
        }
    },[])

    return (
        <div className="chat-sidebar">
            <h3><i className="fas fa-comments"></i> Room Name:</h3>
            <h2 id="room-name">{room}</h2>
            <h3><i className="fas fa-users"></i> Users</h3>
            <ul id="users">
                {userList.map(user => <li key={user}>{user}</li>)}
            </ul>
        </div>
        
    )


}

export default UserList