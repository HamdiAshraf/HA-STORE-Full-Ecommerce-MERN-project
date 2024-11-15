import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:true
    }
},{timestamps:true})



export const Review=mongoose.model("Review",ReviewSchema);