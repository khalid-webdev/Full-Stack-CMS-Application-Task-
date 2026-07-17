require("dotenv").config({quiet:true});
const app = require("./index");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log(`Mongo Db connected successfully...`);
  app.listen(PORT,()=>{
    console.log(`Server is listening on localhost:${PORT}..todo`);
  })
}).catch((err)=>console.log(`Mongodb Connection failed!!!`))
