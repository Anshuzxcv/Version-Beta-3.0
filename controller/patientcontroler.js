const patient = require('../schema/patientProfileSchema');
const tips = require('../schema/tipsSchema');
const email = require('../utils/mail');

const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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


/////////////////////////////////////////////////////////////////////////////////////////SIGNUP
exports.signup = (req, res) => {
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

exports.verifyEmail = async(req,res)=>{
    try{
        const token = crypto.createHash('sha256').update(req.params.id).digest('hex');
        const currpatient =await patient.findOne({passwordResetToken:token});
        currpatient.status = 'active';
        currpatient.passwordResetToken='';
        currpatient.passwordResetExpires=undefined;
        currpatient.save();

        res.send(`<html><head><title>Email verification</title></head><body bgcolor="white"><center><h1>Email veified</h1></center><hr><center>Healthtracker.com</center></body></html>`);
    }
    catch(err){
        res.send(`<html><head><title>Email verification</title></head><body bgcolor="white"><center><h1>Invalid Request <br>or verification process has been already completed.</h1></center><hr><center>Healthtracker.com</center></body></html>`);
    }
}

exports.get_bmi = async(req,res)=>{
    
}

exports.homePage = async(req,res)=>{
    res.send('hello patient');
}