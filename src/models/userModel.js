import mongoose from "mongoose";

const userSchema =mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength:3,
        maxlength:100
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:100
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:20
    }
})

export default userSchema;