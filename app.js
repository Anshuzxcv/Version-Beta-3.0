const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const patientrouter = require('./router/patientrouter');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));


//user = patient
app.use('/user',patientrouter);


app.get('/',(req,res)=>{
    res.send('hello');
})

module.exports = app;


//https://www.mongodb.com/try/download/community