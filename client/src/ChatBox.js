import './index.css';
import React, { useEffect, useRef, useState } from "react";


function ChatBox(props) {
    const socket = props.socket
    const [messages,setMessages]=useState([])
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };


  useEffect(scrollToBottom, [messages]);

  
    useEffect(()=>{
        socket.on('message', message => {
            setMessages(messages => [...messages, message])
          })

        return () =>{
            socket.off('message')
        }
    },[])

    return(
        <div className="chat-messages">
            {messages.map(message => (
                <div className="message">
                    <p className="meta">{message.username} <span>{message.time}</span></p>
                    <p className="text">{message.text}</p>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}
export default ChatBox;