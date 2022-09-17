const User = require('../model/userModel');
const bcrypt = require("bcrypt");

module.exports.register = async (req,res,next) =>{
    try{
        const {username,email, password} = req.body;
        if (username.length <=3){
            return res.json({msg: "Username must be greater than 3 characters!", status: false});
        }
        const usernameCheck = await User.findOne({username});

        if (usernameCheck){
            return res.json({msg: "Username not available!", status: false});
        }
        const emailCheck = await User.findOne({email});
        if (emailCheck){
            return res.json({msg: "This Email is already registered with an account!", status: false});
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });
        delete user.password;
        return res.json({status: true, user})
    } catch (err){
        next(err);
    }

}

module.exports.login = async (req,res,next) =>{
    try{
        const {email,username, password, usernameOrEmail} = req.body;
        let user=null
        if (usernameOrEmail) {
            if (username == "" || password==""){
                return res.json({msg: "Username and password are required!", status: false});
            }
            user = await User.findOne({username});

            if (!user){
                return res.json({msg: "This user does not exist!", status: false});
            }
        } else {
            if (email == "" || password==""){
                return res.json({msg: "Email and password are required!", status: false});
            }
            user = await User.findOne({email});
            if (!user){
                return res.json({msg: "There is no account associated with this email!", status: false});
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.json({msg: "Incorrect password!", status: false});
        }
        delete user.password;
        return res.json({status: true, user})
        
    } catch (err){
        next(err);
    }

}