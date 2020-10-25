const app = require('./app');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});


//const DB = process.env.DATABASE;

mongoose
  .connect("mongodb+srv://aman:aman@cluster0.hhnva.mongodb.net/db?retryWrites=true&w=majority&ssl=true", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(()=>{
    console.log("Connected to the Database. Yayzow!");
  })
  .catch(err => {
    console.log(err);
  });
 

app.listen(3000,()=>{
    console.log('Server started');
})