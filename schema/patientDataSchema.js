const mongoose = require('mongoose');

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

exports.report = mongoose.model('report', reportSchema);