const patientSchema = require('../schema/patientProfileSchema');
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'profile_pic/');
    },
    filename:(req,file,cb)=>{
        const extension = file.mimetype.split('/')[1];
        cb(null,`patient-${req.body.name}-${Date.now()}.${extension}`);
    }
})

const profileImgFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image'))cb(null,true);
    else cb((err)=>console.log(err),false)
}

const upload = multer({
    storage:multerStorage,
    fileFilter:profileImgFilter
});

exports.uploadPatientProfileImg = upload.single('profile-img');

exports.updateProfile = async(req,res)=>{
    const profile_img = req.file.filename;
    console.log(profile_img);
    res.send('okk');
}

exports.homePage = async(req,res)=>{
    res.send('hello patient');
}
