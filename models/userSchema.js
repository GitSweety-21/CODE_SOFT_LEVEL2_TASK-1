import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"please provide your name!"],
        minLength: [3,"Name must contain at least 3 characters!"],
        maxLength: [30,"Name can not exceed 30 characters!"],

    },
    email:{
        type:String,
        required: [true, "Please enter your Email!"],
        validate: [validator.isEmail,"please provide a valid email"],
        },
        phone:{
            type:Number,
            required:[true, "please provide your phone number!"]
        },
        password:{
            type:String,
            required: [true,"please provide your password!"],
            minLength: [8, "password must contain at 8 characters!"],
            maxLength: [32, "password connot exceed 32 charcters!"],
            select:false,
        },
        role:{
            type:String,
            required:[true,"please provide your role"],
            enum:["Job Seeker","Employer"],
        },
        createdAt:{
            type:Date,
            default: Date.now,
        },

});

//HASING THE PASSWORD
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//COMPARING  password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//GENERATING A JWT TOKEN FOR AUTHENTICATION

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
       expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User",userSchema);