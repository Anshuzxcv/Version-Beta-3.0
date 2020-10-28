const Report = require('../schema/patientReportSchema');
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.array("reports", 10);

exports.uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") { 
          return res.status(400).send({ message: 'Too many images exceeding the allowed limit'});
      }
    } else if (err) {
      return res.status(400).send({message: 'error orrurred!'});
    }
    next();
  });
};

exports.resizeImages = async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];
  await Promise.all(
    req.files.map(async file => {
      const newFilename = `${Date.now()}-${Math.floor(Math.random() * 10000000)}.${file.mimetype.split('/')[1]}`;

      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 50 })
        .toFile(`upload/reports/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );

  next();
};

exports.uploadReport = async(req,res)=>{
    const currReport = new Report.report({
        userId: req.body.userId,
        email: req.body.email,
        dr_name: req.body.dr_name,
        reports: req.body.images
    });
    currReport.save(function (err) {
      if (err) return console.error(err);
      res.send(currReport);
    }); 
}

exports.updateReport = async(req,res)=>{
    try{
        const currReport = await Report.report.findOne({_id:req.body.id});
        if(req.body.dr_name)
            currReport.dr_name = req.body.dr_name;
        if(req.body.date)
            currReport.date = req.body.date;
        if(req.body.images)
        {
            req.body.images.map(async image =>{
                currReport.reports.push(image);
            })
        }
        currReport.save(function (err) {
            if (err) return console.error(err);
            res.send(currReport);
        });
    }
    catch(err){
        res.send(err);
    }
}