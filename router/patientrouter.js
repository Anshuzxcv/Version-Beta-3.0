const express = require('express');
const router = express.Router();

const multer = require('multer');
var upload = multer();

router.use(upload.array());


router.get('/user-profile',(req,res)=>{
    res.send('heello');
})


////////////////////////////////woorking on upload profile section
router.post('/update-profile',(req,res)=>{
    const data = req.body;
    console.log(req.body);
    res.send('okk');
})



module.exports = router;