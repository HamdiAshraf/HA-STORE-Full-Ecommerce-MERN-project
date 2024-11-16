import {Router} from "express"
import { Product } from "./products.model.js";
import { Review } from "../reviews/reviews.model.js";
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';



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


router.get("/:id",async(req,res)=>{
    try {
        const productId =req.params.id;
        const product = await Product.findById(productId).populate("author","username email");
        if(!product){
            res.status(404).json({status:"fail",message:"product not found"})
        }
        const reviews = await Review.find({productId}).populate("author","username email")


        res.status(200).json({status:"success",message:"fetch product successfully",data:product,reviews})


        } catch (error) {
        console.error("Error while fetching product: ",error)
        res.status(500).json({status:"error",message:error.message})  
    }
})


router.patch("/update-product/:id",verifyToken,verifyAdmin,async(req,res)=>{
    try {
        const { id }=req.params;
        const updatedProduct=await Product.findByIdAndUpdate(id,{...req.body},{new:true});
        if(!updatedProduct){
            res.status(404).json({status:"fail",message:"product not found"})
        }
        res.status(200).json({status:"success",message:"updated product successfully",data:updatedProduct})
    } catch (error) {
        console.error("Error while updating product: ",error)
        res.status(500).json({status:"error",message:error.message}) 
    }
})

router.delete("/:id",verifyToken,verifyAdmin,async(req,res)=>{
    try {
        const { id }=req.params;
        const deletedProduct=await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            res.status(404).json({status:"fail",message:"product not found"})
        }
        res.status(200).json({status:"success",message:"deleted product successfully",data:deletedProduct})
    } catch (error) {
        console.error("Error while deleting product: ",error)
        res.status(500).json({status:"error",message:error.message}) 
    }
})

router.get("/related/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            res.status(404).json({status:"fail",message:"productId must be provided"})
        }
        const product=await Product.findById(id)
        if(!product){
            res.status(404).json({status:"fail",message:"product not found"})
        }

        const titleRegex=new RegExp(
            product.name.split(" ").filter((word)=>word.length>1).join("|"),
            "i"
        )
        const relatedProducts=await Product.find({
            _id:{$ne:id}, //exclude the current product
            $or:[
                {name:{$regex:titleRegex}}, //match similar names
                {category:product.category} //match similar category
            ]
        })
        res.status(200).json({status:"success",message:"fetch related products successfully",data:relatedProducts})


    } catch (error) {
        console.error("Error while fetching related product: ",error)
        res.status(500).json({status:"error",message:error.message}) 
    }
})


export default router;