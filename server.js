const app = require('./app');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});


mongoose
  .connect(process.env.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(()=>{
    console.log("Connected to the Database");
  })
  .catch(err => {
    console.log(err);
  });
 

const port =3000;
app.listen(port,()=>{
    console.log(`Server started on ${port}`);
})