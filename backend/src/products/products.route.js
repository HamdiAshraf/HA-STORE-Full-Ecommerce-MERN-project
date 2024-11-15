import {Router} from "express"
import { Product } from "./products.model.js";
import { Review } from "../reviews/reviews.model.js";

const router=Router();


router.post("/create-product",async(req,res)=>{
    try {
        const newProduct=new Product({...req.body});
        const savedProducts=await newProduct.save()

        //calculate review
        const reviews=await Review.find({productId:savedProducts._id})
        if(reviews.length>0){
            const totalRating=reviews.reduce((acc,review)=>acc+review.rating,0);
            const averageRating = totalRating / reviews.length;
            savedProducts.rating=averageRating;
            await savedProducts.save()
        }

        res.status(200).json({status:"success",message:"created product successfully",data:savedProducts})

    } catch (error) {
        console.error("Error while creating product: ",error)
        res.status(500).json({status:"error",message:error.message}) 
    }
})


router.get("/",async(req,res)=>{
    try {
        const {category,color,minPrice,maxPrice,page=1,limit=10} =req.query;
        let filter={};
        if(category && category!=="all"){
            filter.category=category
        }
        if(color && color!=="all"){
            filter.color=color
        }
        if(minPrice&&maxPrice){
            const min =parseFloat(minPrice)
            const max =parseFloat(maxPrice)
            if(!isNaN(min) && !isNaN(max)){
                filter.price={$gte:min,$lte:max}

            }
        }
        
        const skip = (parseInt(page) - 1 ) * parseInt(limit);
        const totalProducts = await Product.countDocuments(filter);
        const totalPages=(Math.ceil(totalProducts / parseInt(limit)));
        const products=await Product.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .populate("author","email")
        .sort({createdAt:-1});

        
        res.status(200).json({status:"success",message:"fetch products successfully",totalProducts,totalPages,data:products})



        } catch (error) {
        console.error("Error while fetching products: ",error)
        res.status(500).json({status:"error",message:error.message}) 
    }
})







export default router;