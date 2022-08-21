const path = require('path')
const http = require('http')
const express = require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave,getRoomUsers,queuemsg, emptyqueue } = require('./utils/users')
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

        const user = userJoin(socket.id, username,roomname)
        socket.join(user.room)
    

        socket.data.username = user.username
        //Welcome current user

        //Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(chatmaster,`${user.username} has joined the chat`))

        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoomUsers(user.room),
        })

    })    

    //Listen for chat message
    socket.on('chatMessage', async (msg)=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username,msg))       
    })

    //Runs wehn client disconnects
    socket.on('disconnect', async ()=>{
        const user = userLeave(socket.id)
        if (user){
            io.to(user.room).emit('message', formatMessage(chatmaster,`${user.username} has left the chat`))
            io.to(user.room).emit('roomUsers',{
                room: user.room,
                users: getRoomUsers(user.room),
            })
        }

    })
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });


const PORT = 3001 || process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));