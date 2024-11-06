import {Schema,model} from "mongoose"
import bcrypt from 'bcrypt';

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
    role:{
        type:String,
        default:"user"
    },
    profileImage:{
        type:String
    },
    bio:{
        type:String,
        maxlength:200
    },
    profession:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

UserSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified('password')) return next();
    const hashedPassword=await bcrypt.hash(user.password,10);
    user.password=hashedPassword;
    next();
})

UserSchema.methods.comparePassword=function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}

export const User=model("User",UserSchema)