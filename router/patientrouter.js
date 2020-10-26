const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientcontroler');

router.get('/',patientController.homePage);

module.exports = router;