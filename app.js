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
/*app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    console.log("name is : ", name);
    console.log("email is : ", email);
    res.send('found');
})*/
app.use('/doctor/', doctorRouter);


module.exports = app;


//https://www.mongodb.com/try/download/community