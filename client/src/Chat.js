import './index.css';
import React, { useEffect, useState } from "react";
import UserList from './UserList';
import ChatBox from './ChatBox';
import ChatForm from './ChatForm';
import { useParams,useNavigate } from "react-router-dom";
import io from 'socket.io-client'
import axios from 'axios'
import {leaveRoomRoute} from "./utils/APIRoutes"


function Chat() {
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate()
    const [wrongRoom,setWrongRoom] = useState(false)
    const [params,setParams] = useState(useParams())

    useEffect(()=>{
      
      if (!localStorage.getItem('chat-app-user')){
        navigate('/Login');
      } else if (!localStorage.getItem('chat-app-current-room')){
        navigate('/Rooms');
    } else {
      let res = {
        ...params
      }
      const user = JSON.parse(localStorage.getItem('chat-app-user'))
      res.username = user.username
      setParams(res)
      const data = JSON.parse(localStorage.getItem('chat-app-current-room'))
      if (data.currentRoom!= params.roomName){
        setWrongRoom(true)
  
      } else {
  
        const newSocket = io()
        setSocket(newSocket)
        newSocket.emit('joinRoom', {username: user.username, roomname: params.roomName})
  
        return  ()=> newSocket.disconnect()
      }     

    }

    
     
    },[])

    const handleClick = async () => {

      localStorage.removeItem("chat-app-current-room")
      const {data} = await axios.post(leaveRoomRoute,{
        username: params.username,
        roomname: params.roomName
      })

      navigate('/')

    }
    
    if (wrongRoom){
      return (
        <h1> This is not your room, you're room is {params.roomName}</h1>
      )
    } else {
      return(
        <div>
          
          {socket ? 
            <div className="chat-container">
              <header className="chat-header">
                <h1><i className="fas fa-smile"></i> EasyChats</h1>
                <button onClick={handleClick} className="btn">Leave Room</button>
              </header>
              <main className="chat-main">
                <UserList username={params.username} roomname={params.roomName} socket={socket}/>
                <ChatBox socket={socket}/>
              </main>
              <ChatForm socket={socket} username={params.username} roomname={params.roomName}/>
            </div>     
          :
          <div>Not connected</div>
          }
          </div>
      )
    }
    
}

export default Chat;