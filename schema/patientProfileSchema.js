const mongoose = require('mongoose');
const crypto = require('crypto');


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
    profile_img: {
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

patientSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

module.exports = mongoose.model('patient', patientSchema);