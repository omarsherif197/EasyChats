import './index.css';
import React, { useEffect, useState } from "react";
import UserList from './UserList';
import ChatBox from './ChatBox';
import ChatForm from './ChatForm';
import { useSearchParams,useNavigate } from "react-router-dom";
import io from 'socket.io-client'


function Chat() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate()

    useEffect(()=>{
      const newSocket = io()
      setSocket(newSocket)
      if (searchParams.get('username')==null){
        navigate('/')
      }

      
      /*
      ideas: 
      1. create a new event that's not joinroom where user is just refreshing page and is assigned a new socket
      use that event based on loggedIn state
      2. 
      */
      newSocket.emit('joinRoom', {username: searchParams.get('username'), roomname: searchParams.get('roomname')})
     
      return  ()=> newSocket.disconnect()
     
    },[])

    const handleClick = () => {
      navigate('/',{replace:true})
    }
    
    return(
      <div>
        {socket ? 
          <div className="chat-container">
            <header className="chat-header">
              <h1><i className="fas fa-smile"></i> EasyChats</h1>
              <button onClick={handleClick} className="btn">Leave Room</button>
            </header>
            <main className="chat-main">
              <UserList username={searchParams.get('username')} roomname={searchParams.get('roomname')} socket={socket}/>
              <ChatBox socket={socket}/>
            </main>
            <ChatForm socket={socket}/>
          </div>     
        :
        <div>Not connected</div>
        }
        </div>
    )
}

export default Chat;