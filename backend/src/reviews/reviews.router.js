import {Router} from 'express'
import { Review } from './reviews.model.js';
import { Product } from '../products/products.model.js';
const router=Router()

router.post('/post-review',async(req,res)=>{
    try {
        const {comment,rating,userId,productId} =req.body;
        if(!comment || !rating || !userId || !productId){
            return res.status(400).json({status:"fail",message:"all fields are required"})
        }
        const existingReview=await Review.findOne({userId,productId});
        if(existingReview){
            // update review
            existingReview.comment=comment;
            existingReview.rating=rating;
            await existingReview.save()
        }else{
            const newReview=new Review({comment,rating,userId,productId});
            await newReview.save()
        }

        const reviews = await Review.find({productId});
        if(reviews.length>0){
            const totalRating=reviews.reduce((acc,review)=>acc + review.rating,0);
            const averageRating=totalRating / reviews.length;
            const product=await Product.findById(productId)
            if(product){
                product.rating=averageRating;
                await product.save({validateBeforeSave:false})
            }else{
            return res.status(404).json({status:"fail",message:"product not found"})

            }
        }


        res.status(200).json({status:'success',message:'review processed successfully',data:reviews})
    } catch (error) {
        console.error("Error while posting review: ",error)
        res.status(500).json({status:"error",message:error.message})   
    }
})





export default router;