const patientSchema = require('../schema/patientDataSchema');

exports.homePage = async(req,res)=>{
    res.send('hello patient');
}