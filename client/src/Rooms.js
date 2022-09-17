import React, { useEffect ,useState} from 'react'
import {getRoomsRoute,joinRoomRoute} from "./utils/APIRoutes"
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios';

function Rooms(){
    const [rooms,setRooms] = useState([])
    const navigate = useNavigate()
    const [currentRoom,setCurrentRoom] = useState("")
    const [password,setPassword] = useState("")
    const [currentUser,setCurrentUser] = useState("")
    const [serverError,setServerError] = useState("")

    useEffect(()=>{


        if (!localStorage.getItem('chat-app-user')){
            navigate('/Login');
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')).username)
        }

        if (localStorage.getItem('chat-app-current-room')){
            const data = JSON.parse(localStorage.getItem('chat-app-current-room'))
            navigate(`/Chat/${data.currentRoom}`)
        }



        

        const fetchRooms = async () => {
            const {data} = await axios.get(getRoomsRoute)
            for (let room of data){
                room.visible=false;
                room.password=""
            }
            setRooms(data)
        }
     
        fetchRooms()

    },[])

    const handleClick = async () =>{
        const {data} = await axios.post(joinRoomRoute,{
            username: currentUser,
            roomname: currentRoom,
            password
        })

        if (data.status==false){
            setServerError(data.msg)
        }
        if (data.status == true){
            localStorage.setItem('chat-app-current-room',JSON.stringify({currentRoom}));
            navigate(`/Chat/${currentRoom}`)
        }
    }

    const handleLogout = async () =>{
        localStorage.removeItem('chat-app-user')
        navigate('/')
    }


    return(
        <div className="room-container">
            <main className="room-main">
            <button className='logout' onClick={handleLogout}>Logout</button> 
            <h1>Click room name to join</h1>
            {rooms.map((room)=>(
                <button className="room" key ={room.roomname} value={room.roomname} onClick={(e)=> setCurrentRoom(e.target.value)}>{room.roomname}</button>
            ))}

            {rooms.length > 0 && 
                            <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password..."
                required
                value={password}
                onChange= {(e) => setPassword(e.target.value)}
            />        
                
            }
                
            <button className="btn" onClick={handleClick} disabled = {rooms.length == 0} > Join room</button>
            <Link className="btn" to="/MakeRoom">Make a room</Link>
            {
                        serverError.length>0 &&
                         <div className='error-message-server' > {serverError} </div>
                    }
            </main>
            
        </div>
    )
}

export default Rooms