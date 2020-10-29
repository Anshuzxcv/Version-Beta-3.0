const mongoose = require('mongoose');

const tipsSchema = new mongoose.Schema({
    tip:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('tips',tipsSchema);