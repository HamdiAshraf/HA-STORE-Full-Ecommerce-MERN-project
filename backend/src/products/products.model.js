import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:String,
    description:String,
    price:{
        type:Number,
        required:true,

    },
    oldPrice:Number,
    image:String,
    color:String,
    rating:{
        type:String,
        default:0
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
})



export const Product=mongoose.model("Product",ProductSchema);