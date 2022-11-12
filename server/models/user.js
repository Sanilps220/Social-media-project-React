const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema =  new mongoose.Schema({
    name:{
        type:String ,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required:true
    },
    // pic:{
    //     type:String,
    //     required:true
    // },
    // isBlocked:{
    //    type:Boolean,
    //    default:false 
    // },
    // followers:[{
    //     type:ObjectId,
    //     ref:'User'
    // }],
    // following:[{
    //     type:ObjectId,
    //     ref:"User"
    // }],
})

mongoose.model('User',userSchema);