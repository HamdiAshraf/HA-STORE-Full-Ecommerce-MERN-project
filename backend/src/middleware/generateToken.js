import dotenv from "dotenv";
dotenv.config(); 

import jwt from "jsonwebtoken";
import { User } from '../users/users.model.js';
const JWT_SECRET_KEY =process.env.JWT_SECRET_KEY
export const generateToken=async(userId)=>{
    try {
        const user=await User.findById(userId);
        if(!user){
            throw new Error("user not found")
        }

        const token=await jwt.sign({userId:user._id,role:user.role},JWT_SECRET_KEY,{expiresIn:'1h'});

        return token;
    } catch (error) {
        
    }
}


