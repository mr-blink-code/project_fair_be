const mongoose = require('mongoose');

const connectionString=process.env.DATABASE;
console.log(connectionString)
mongoose.connect(connectionString).then((res)=>{
    console.log("Mongo DB connected sucessfully")
})
.catch((err)=>{
    console.log("Mongodb connection failed");
    console.log(err);
})