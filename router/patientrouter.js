const express = require('express');
const router = express.Router();

const patientController = require('../controller/patientReportController');

router.post("/reports", patientController.uploadImages, patientController.resizeImages, patientController.uploadReport);

router.put('/reports', patientController.uploadImages, patientController.resizeImages, patientController.updateReport);

module.exports = router;