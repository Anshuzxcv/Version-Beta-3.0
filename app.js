const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const patientRouter = require('./router/patientrouter');
const doctorRouter = require('./router/doctorrouter');
const publicRouter = require('./router/publicrouter');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));


app.use('/patient', patientRouter);


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




app.use('/public/',publicRouter);
app.use('/patient/', patientRouter);
app.use('/doctor/', doctorRouter);

app.all('*',(req,res)=>{
    res.json({
        status:'fail',
        message:'Route not found'
    })
})

module.exports = app;

//https://www.mongodb.com/try/download/community