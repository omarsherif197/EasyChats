const Room = require('../model/roomModel');
const bcrypt = require("bcrypt");

module.exports.makeRoom = async (req,res,next) =>{
    try{
        const {roomname, password} = req.body;

        if (roomname.length == 0){
            return res.json({msg: "Room name cannot be empty!", status: false});
        }

        const roomnameCheck = await Room.findOne({roomname})

        if (roomnameCheck){
            return res.json({msg: "A room with this name already exists!", status: false});
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const room = await Room.create({
            roomname,
            password: hashedPassword
        });

        delete room.password;
        return res.json({status: true, room})
    } catch (err){
        next(err)
    }
}


module.exports.getRooms = async (req,res,next) =>{
    try {

        const Rooms = await Room.find({}).select("roomname -_id")
        return res.json(Rooms)
    } catch(err){
        next(err)
    }
}

module.exports.getRoomUsers = async (req,res,next) =>{
    try {
        const {roomname} = req.body;
        const room = await Room.findOne({roomname}).select("users")

        if (!room){
            return res.json({msg: "Can't find this room??", status: false});
        }

        return res.json({status: true, room})
    } catch(err){
        next(err)
    }
}

module.exports.joinRoom = async (req,res,next) =>{

    try{
        const {roomname,password, username} = req.body
    const room = await Room.findOne({roomname})
    
    
    const isPasswordValid = await bcrypt.compare(password, room.password);
    console.log(isPasswordValid)
    if (!isPasswordValid){
        return res.json({msg: "Incorrect room password!", status: false});
    }

    const updateRoom = await Room.updateOne({roomname},{users: [...room.users,username]})
    return res.json({status: true})
    } catch(err){
        next(err)
    }
    
}


module.exports.leaveRoom = async (req,res,next) => {
    try{
        const {roomname,username} = req.body
        console.log(roomname,username)
        const room = await Room.findOne({roomname})
        console.log(room)
        let users = room.users.filter((user) => user != username)

        const updateRoom = await Room.updateOne({roomname},{users})
        return res.json({status: true})

    } catch(err) {
        next(err)
    }
}