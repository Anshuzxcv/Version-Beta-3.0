const mongoose = require('mongoose');

const patientSchema = {
    name: String,
    age : Number,
    pic: String
}

const reportSchema = {
    dr_name:{ 
        type:String,
        required: true
    },
    date: { 
        type:Date,
        required: true
    },
    report: { 
        type:String,
        required: true
    },
}

exports.patient = mongoose.model('patient', patientSchema);
exports.report = mongoose.model('report', reportSchema);