const JWT_SECRET_KEY =process.env.JWT_SECRET_KEY
import jwt from "jsonwebtoken";

export const verifyToken=(req,res,next)=>{
    try {
        const token= req.cookies.token;
        // const token = req.headers["Authorization"].split(" ")[1];
        if(!token){
            res.status(401).json({status:"fail",message:"invalid token"})
        }
        const decoded=jwt.verify(token,JWT_SECRET_KEY);
        if(!decoded){
            res.status(401).json({status:"fail",message:"not valid token"})

        }
        req.userId=decoded.userId;
        req.role=decoded.role;
        next()
    } catch (error) {
        console.error('Error while verifying token')
        res.status(401).json({status:"error",message:"Error while verifying token "})
    }
}