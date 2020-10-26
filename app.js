const express = require('express');
const app = express();
const patientRouter = require('./router/patientrouter');
const doctorRouter = require('./router/doctorrouter');
app.use(express.static("public"));

app.use('/patient/', patientRouter);
app.use('/doctor/', doctorRouter);


module.exports = app;


//https://www.mongodb.com/try/download/community