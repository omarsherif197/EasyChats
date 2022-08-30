const path = require('path')
const http = require('http')
const express = require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const userRoutes = require("./routes/userRoutes")
const roomRoutes = require("./routes/roomRoutes")

const app = express();
const server = http.createServer(app);
const io = socketio(server)
require('dotenv').config({path:__dirname+'/.env'})

app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)

app.use("/api/room",roomRoutes)


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>{
    console.log(err.message);
});

const chatmaster = "EasyChats"
//Run when client connects
io.on('connection', socket =>{

    socket.on('joinRoom', ({username, roomname})=>{

        socket.join(roomname)
        console.log(username)

        socket.data.username = username
        //Welcome current user

        //Broadcast when a user connects
        socket.broadcast.to(roomname).emit('message', formatMessage(chatmaster,`${username} has joined the chat`))

        io.to(roomname).emit('roomUsers')

    })    

    //Listen for chat message
    socket.on('chatMessage', async ({msg,username,roomname})=>{
        io.to(roomname).emit('message', formatMessage(username,msg))       
    })

    //Runs wehn client disconnects
    // socket.on('disconnect', async ()=>{
    //     const user = userLeave(socket.id) //tochange
    //     if (user){
    //         io.to(user.room).emit('message', formatMessage(chatmaster,`${user.username} has left the chat`))
    //         io.to(user.room).emit('roomUsers',{
    //             room: user.room,
    //             users: getRoomUsers(user.room),
    //         })
    //     }

    // })
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });


const PORT = 3001 || process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));