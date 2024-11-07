
import { generateToken } from '../middleware/generateToken.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { User } from './users.model.js';

import {Router} from 'express'


const router=Router()


router.post("/register",async(req,res)=>{
    try{
        const {username,email,password} =req.body;
        const isExist=await User.findOne({email});
        if(isExist){
            return res.status(404).json({status:"fail",message:"user already exists"})
        }

        const newUser= new User({username,email,password})
        
        await newUser.save();
        res.status(201).json({status:"success",message:"registration successfully",data:newUser})
    }catch(err){
        console.error("Registration Error: ",err)
        res.status(500).json({status:"error",message:err.message})
    }
})


router.post("/login",async(req,res)=>{
    try{
        const {email,password} =req.body;
        if (!email || !password) {
            return res.status(400).json({ status: "fail", message: "Email and password are required" });
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({status:"fail",message:"user not found"})
         
        }
        const isMatch=await user.comparePassword(password)
        if(!isMatch){
            return res.status(404).json({status:"fail",message:"incorrect password"})
        }

        const token = await generateToken(user._id)
        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'none'
        })
        
        
        
        res.status(200).json({status:"success",message:"logged in successfully",token,data:{
            _id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            profileImage:user.profileImage,
            bio:user.bio,
            profession:user.profession
        }})
    }catch(err){
        console.error("Logged in Error: ",err)
        res.status(500).json({status:"error",message:err.message})
    }
})

router.post("/logout",verifyToken,(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({status:"success",message:"logged out successfully"})
})

router.delete("/users/:id",verifyToken,async(req,res)=>{
    try {
        const {id} =req.params;
        const user=await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({status:"fail",message:"user not found"})
        }
        res.status(200).json({status:"success",message:"deleted user successfully"})
        

    } catch (error) {
        console.error("Error while deleteing user: ",err)
        res.status(500).json({status:"error",message:err.message}) 
    }
})

router.get("/users",verifyToken,async(req,res)=>{
    try {
        const users=await User.find({},"id email role").sort({createdAt:-1});
        res.status(200).json({status:"success",message:"fetch all users successfully",data:users})
    } catch (error) {
        console.error("Error while fetch all users: ",err)
        res.status(500).json({status:"error",message:err.message}) 
    }
})


export default router;