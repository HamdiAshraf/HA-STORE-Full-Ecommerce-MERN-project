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
        res.status(200).json({status:"success",message:"logged in successfully",data:user})
    }catch(err){
        console.error("Logged in Error: ",err)
        res.status(500).json({status:"error",message:err.message})
    }
})




export default router;