
const express=require("express");
const mongoose=require('mongoose');
require("dotenv").config()
const cors=require("cors")

const cookieParser = require("cookie-parser");

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


//db connection
mongoose.connect(process.env.DB_URL)
.then(()=>console.log(`connected successfully to db`))
.catch((err)=>console.log(`failed to connect to db`,err)
)


app.get("/",(req,res)=>{
    res.send("Hello World!")
})


app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    
})