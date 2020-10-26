const patientSchema = require('../schema/patientProfileSchema');
const multer = require('multer');
const sharp = require('sharp');


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
    const profile_img = req.file.filename;
    console.log(profile_img);
    res.send('okk');
}
exports.homePage = async(req,res)=>{
    res.send('hello patient');
}
