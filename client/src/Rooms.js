import React, { useEffect ,useState} from 'react'
import {getRoomsRoute,makeRoomRoute} from "./utils/APIRoutes"
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios';

function Rooms(){
    const [rooms,setRooms] = useState([])
    const navigate = useNavigate()
    const [currentRoom,setCurrentRoom] = useState("")
    const [password,setPassword] = useState("")

    useEffect(()=>{

        if (!localStorage.getItem('chat-app-user')){
            navigate('/Login');
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

    const handleClick = () =>{
        const {data} = await axios.post()
    }


    return(
        <div className="room-container">
            <main className="room-main">
            <h1>Click room name to join</h1>
            {rooms.map((room)=>(
                <button className="room" value={room.roomname} onClick={(e)=> setCurrentRoom(e.target.value)}>{room.roomname}</button>
            ))}

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password..."
                    required
                    value={password}
                    onChange= {(e) => setPassword(e.target.value)}
                />
			

            <button className="btn" onClick={handleClick} > Login</button>
            <Link className="btn" to="/MakeRoom">Make a room</Link>

            </main>
            
        </div>
    )
}

export default Rooms