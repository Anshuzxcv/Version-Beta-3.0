const express = require('express');
const router = express.Router();


const patientController = require('../controller/patientcontroler');
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

//Signup Router
router.post("/signup", patientController.patient_signup);


//Login Router
router.post("/login", patientController.patient_login);

//Delete Router
router.delete("/:userId", patientController.patient_delete);


module.exports = router;