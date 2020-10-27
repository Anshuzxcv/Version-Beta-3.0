const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        //required:[true,"Please enter name"],
    },
    email:{
        type:String,
        //required:[true,"please enter email"],
        unique:true,
    },
    mobile:{
        type:String,
        unique:true,
        //required:[true,"please enter mobile"]
    },
    age : {
        type: String,
        default:"0"
    },
    profile_img: {
        type: String,
        default:""
    },
    gender:{
        type:String,
        default:"M"
    },
    height:{
        type:Number,
        default:""
    },
    weight:{
        type:Number,
        default:""
    },
    status:{
        type:String,
        default:"inactive"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    token:{
        type:String
    },
    passwordResetToken:{
        type:String
    },
    passwordResetExpires:{
        type:Date
    }
});

module.exports = mongoose.model('patient', patientSchema);