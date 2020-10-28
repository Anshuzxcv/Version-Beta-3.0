const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patientController = require('../controller/patientcontroler');
const patient = require('../schema/patientProfileSchema');
router.get('/', patientController.homePage);


const multer = require('multer');
var upload = multer();
router.use(upload.array());


router.get('/user-profile', (req, res) => {
    res.send('heello');
})


////////////////////////////////working on upload profile section
router.post('/update-profile', (req, res) => {
    const data = req.body;
    console.log(req.body);
    res.send('okk');
})

//////////////SignUp Router
router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.email, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });

        } else {
            const Patient = new patient({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: hash
            });
            Patient.save();

        }
    })


});


module.exports = router;