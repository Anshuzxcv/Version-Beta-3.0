const patientController = require('../controller/patientcontroler');
const patient = require('../schema/patientProfileSchema');

const express = require('express');
const router = express.Router();

router.get('/',patientController.homePage);


router.post('/signup', (req, res) => {
    const Patient = new patient({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
    });
    res.send(Patient);
});

router.get('/user-profile',(req,res)=>{
    res.send('heello');
})

router.post('/update-profile',patientController.uploadPatientProfileImg,patientController.resizeProfileImage,patientController.updateProfile);

module.exports = router;