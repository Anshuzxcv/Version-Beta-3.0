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


app.use('/patient/', patientRouter);
app.use('/doctor/', doctorRouter);


module.exports = app;


//https://www.mongodb.com/try/download/community