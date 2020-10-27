const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const patientRouter = require('./router/patientrouter');
const doctorRouter = require('./router/doctorrouter');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));


//////////////////////////////////////////////////////////////////////////////////////////////only for development
const patient = require('./schema/patientProfileSchema');
app.post('/dummy',async(req,res)=>{
    try{
        //console.log(req.body);
        const newpatient = await patient.create(req.body);
        //console.log(newpatient);
        res.send(newpatient);
    }
    catch(err){
        console.log('err');
        res.send(err);
    }
})
////////////////////////////////////////////////////////////////////////////////////////////////





app.use('/patient/', patientRouter);
app.use('/doctor/', doctorRouter);


module.exports = app;

//https://www.mongodb.com/try/download/community