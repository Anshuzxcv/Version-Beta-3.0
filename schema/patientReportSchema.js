const mongoose = require('mongoose');

const reportSchema = {
    userId: String,
    email: String,
    date: Date,
    dr_name: String,
    madecine:[{name:String, time:Date}],
    reports:[{type:String}]
}

exports.report = mongoose.model('reportDB', reportSchema);