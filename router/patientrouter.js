const patientController = require('../controller/patientcontroler');
const patient = require('../schema/patientProfileSchema');

const express = require('express');
const router = express.Router();

router.get('/',patientController.homePage);
router.post('/signup', patientController.signup);
router.get('/user-profile',(req,res)=>{res.send('heello');})
router.post('/update-profile',patientController.uploadPatientProfileImg,patientController.resizeProfileImage,patientController.updateProfile);
router.get('/verifyemail/:id',patientController.verifyEmail);
module.exports = router;