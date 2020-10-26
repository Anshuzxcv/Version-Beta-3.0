const patientController = require('../controller/patientcontroler');

const express = require('express');
const router = express.Router();

router.get('/',patientController.homePage);

router.get('/user-profile',(req,res)=>{
    res.send('heello');
})

router.post('/update-profile',patientController.uploadPatientProfileImg,patientController.resizeProfileImage,patientController.updateProfile);


module.exports = router;