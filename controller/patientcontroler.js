const patient = require('../schema/patientProfileSchema');
const tips = require('../schema/tipsSchema');
const email = require('../utils/mail');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

//////////////////////////////////////////////////////////////////////// for profile pic upload and resize using multer and sharp package
const multerStorage = multer.memoryStorage();
const profileImgFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image'))cb(null,true);
    else cb((err)=>console.log(err),false)
}
const upload = multer({
    storage:multerStorage,
    fileFilter:profileImgFilter
});
exports.uploadPatientProfileImg = upload.single('profile-img');
exports.resizeProfileImage = (req,res,next)=>{
    if(!req.file)return next();
    const extension = req.file.mimetype.split('/')[1];
    req.file.filename=`patient-${req.body.name}-${Date.now()}.${extension}`;
    sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`profile_pic/${req.file.filename}`);
    next();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.updateProfile = async(req,res)=>{
    try{
        const currpatient = await patient.findOne({email:req.body.email});
        if(req.body.age) currpatient.age = req.body.age;
        if(req.body.gender) currpatient.age = req.body.gender;
        if(req.body.height) currpatient.age = req.body.height;
        if(req.body.weight) currpatient.age = req.body.weight;

        const oldprofile_img = currpatient.profile_img;
        if(req.file){
            currpatient.profile_img=req.file.filename;
            currpatient.save();
            fs.unlinkSync(`${__dirname}/../profile_pic/${oldprofile_img}`,(err)=>{
                if(err)res.send (err);
            });
        }
        else currpatient.save();

        res.send(currpatient);
    }
    catch(err){
        res.send(err);
    }
}


exports.get_bmi = async(req,res)=>{
    
}

exports.homePage = async (req, res) => {
    res.send('hello patient');
}

exports.patient_signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({error: err});
        } else {
            const Patient =new patient({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: hash
            });
            const verifyToken = Patient.createPasswordResetToken();
            const verifyURL = `${req.protocol}://${req.get('host')}/patient/verifyemail/${verifyToken}`;                     
            Patient
                .save()
                .then(result => {
                    new email(Patient,verifyURL).sendWelcome();

                    res.status(201).json({
                        message: 'User created'
                    });

                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    })
}

exports.patient_login = (req, res, next) => {
    patient.find({ email: req.body.email })
        .exec()
        .then(Patient => {
            if (Patient.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, Patient[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: Patient[0].email,
                            userId: Patient[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.patient_delete = (req, res, next) => {
    patient.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}