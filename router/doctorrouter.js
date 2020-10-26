const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctorcontroller');

router.get('/',doctorController.homePage);

module.exports = router;