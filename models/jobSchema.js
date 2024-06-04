import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true,"Please provide job title."],
        minLength: [3, "Job title must contain at least 3 characters!"],
        maxLength: [50,"Job title connot exceed 50 character"],

    },
    description:{
        type:String,
        required: [true,"Please provide job description."],
        minLength: [30, "Job description must contain at least 50 characters!"],
        maxLength: [500,"Job description connot exceed 500 characters!"],

    },
    category:{
        type:String,
        required: [true,"Job Category is required!"]
    },
    country:{
        type:String,
        required: [true,"Job Country is required!"]
    },
    city:{
        type:String,
        required: [true,"Job City is required!"]
    },
    location:{
        type:String,
        required: [true,"Please provide exact location!"],
        minLength:[50, "location must contain at least 50 characters!"],
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Fixed salary must contain at least 4 digits!"],
        maxLength:[9, "Fixed salary cannot exceed 9 digits!"],
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Salary Form must contain at least 4 digits!"],
        maxLength:[9, "Salary Form cannot exceed 9 digits!"],
    },
    salaryTo:{
        type:Number,
        minLength:[4,"SalaryTo must contain at least 4 digits!"],
        maxLength:[9, "SalaryTo cannot exceed 9 digits!"],
    }, 
    expired: {
        type:Boolean,
        default: false,
    },
    jobPostedOn: {
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true,
    },
});
export const Job = mongoose.model("Job",jobSchema);
