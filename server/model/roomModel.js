const mongoose=require('mongoose');

const roomSchema = new mongoose.Schema({
    roomname:{
        type: String,
        required: true,
        max:20,
        unique: true
    },
    password:{
        type: String,
        required: true,
        max:50
    },
    users:[String],
})

module.exports=mongoose.model("Rooms",roomSchema)
