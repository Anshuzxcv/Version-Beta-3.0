const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        //unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
        default: "0"
    },
    profile_pic: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: "M"
    },
    height: {
        type: Number,
        default: ""
    },
    weight: {
        type: Number,
        default: ""
    },
    status: {
        type: String,
        default: "inactive"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    token: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    }
});



//exports.patient = mongoose.model('patient', patientSchema);
module.exports = mongoose.model('patient', patientSchema);