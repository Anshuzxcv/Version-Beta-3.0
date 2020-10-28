const publiccontroller = require('../controller/publiccontroller');

const express = require('express');
const router = express.Router();




router.get('/get-tips',publiccontroller.tip);
router.post('/create-tips',publiccontroller.createtips);

module.exports = router;