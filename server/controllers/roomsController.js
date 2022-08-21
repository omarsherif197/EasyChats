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

        const Room = await Room.findOne({roomname}).select("users")

        if (!Room){
            return res.json({msg: "Can't find this room??", status: false});
        }

        return res.json({status: true, Room})
    } catch(err){
        next(err)
    }
}