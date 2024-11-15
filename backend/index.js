
import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from"cors"
dotenv.config(); 
import cookieParser from "cookie-parser";

const app=express();
const PORT=process.env.PORT || 3000;

//middleware setup
app.use(express.json({limit:"25mb"}));
app.use((express.urlencoded({limit:"25mb",extended:true})))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//all routes
import authRoutes from "./src/users/users.route.js";
import productRoutes from "./src/products/products.route.js";

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);


//db connection
mongoose.connect(process.env.DB_URL)
.then(()=>console.log(`connected successfully to db`))
.catch((err)=>console.log(`failed to connect to db`,err)
)




app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    
})