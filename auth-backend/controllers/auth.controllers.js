import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import generateJWTTokenTokenAndSetCookie from "../utils/generateToken.js";


const signup = async (req , res) => {
    console.log("called");
    try{
        const {username , password} = req.body;
        const hashedPassword = await bcrypt.hash(password , 10);
        const foundUser = await User.findOne({username});

        if(foundUser){
            res.status(201).json({message: "Username already exist"});
        }
        else{
            const user = new User({username: username, password: hashedPassword});
            generateJWTTokenTokenAndSetCookie(user._id ,username, res);
            await user.save();
            res.status(201).json({message : "User registerd!"});
        }
    }catch(error){
        
        res.status(500).json({message : "User registerd!"});
        console.log(error);
    }
}


export const login = async (req , res) => {
    console.log("called");
    try{
        const {username , password} = req.body;
        // const hashedPassword = await bcrypt.hash(password , 10);
        const foundUser = await User.findOne({username});

        if(!foundUser){
            res.status(401).json({message: "Auth failed"});
        }
        else{
            const passwordMatch = await bcrypt.compare(password , foundUser?.password || "");
            if(!passwordMatch){
                res.status(401).json({message: "Auth failed"});
            }


            // const user = new User({username: username, password: hashedPassword});
            generateJWTTokenTokenAndSetCookie(foundUser._id ,username, res);
            // await user.save();
            res.status(201).json({_id: foundUser._id , username: foundUser.username});
        }
    }catch(error){
        
        res.status(500).json({message : "login failed"});
        console.log(error);
    }
}

export default signup