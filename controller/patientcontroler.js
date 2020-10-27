const patient = require('../schema/patientProfileSchema');
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
        const oldprofile_img = currpatient.profile_img;
        
        if(req.file){
            currpatient.profile_img=req.file.filename;
            //console.log(req.file);
            //console.log(`${__dirname}../profile_pic/${oldprofile_img}.jpeg`);
            //fs.unlink(`${__dirname}/../profile_pic/${oldprofile_img}.jpeg`);
            const path =`${__dirname}`;
            console.log(path);


            // fs.readdir(`${__dirname}../`, (err, files) => {
            //     files.forEach(file => {
            //       console.log(file);
            //     });
            // })
        
        
        }

        currpatient.save();
        res.send(currpatient);
    }
    catch(err){
        res.send(err);
    }
}


exports.homePage = async(req,res)=>{
    res.send('hello patient');
}
