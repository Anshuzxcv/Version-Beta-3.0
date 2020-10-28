const patientController = require('../controller/patientcontroler');
const patient = require('../schema/patientProfileSchema');
const bcrypt = require('bcryptjs');

const express = require('express');
const router = express.Router();

router.get('/',patientController.homePage);


router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });

        } else {
            const Patient =new patient({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: hash
            });
            Patient
                .save()
                .then(result => {
                    //console.log(result);
                    res.status(201).json({
                        message: 'User created'
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
    })
});


router.get('/user-profile',(req,res)=>{
    res.send('heello');
})

router.post('/update-profile',patientController.uploadPatientProfileImg,patientController.resizeProfileImage,patientController.updateProfile);

module.exports = router;