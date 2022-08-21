import './index.css';
import React, { useState,useRef } from "react";


function ChatForm(props) {

  const socket=props.socket
  const [input,setInput] = useState("")
  const inputReference = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault()
    socket.emit('chatMessage', input)
    setInput("")
    inputReference.current.focus();
  }

    
    return(
        <div className="chat-form-container">
      <form onSubmit={handleSubmit} id="chat-form">
        <input
          id="msg"
          type="text"
          placeholder="Enter Message"
          required
          autoComplete="off"
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          ref={inputReference}
        />
        <button type="submit" className="btn"><i className="fas fa-paper-plane"></i> Send</button>
      </form>
    </div>
    )
}
export default ChatForm;