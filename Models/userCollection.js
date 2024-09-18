//import momgoose
const mongoose =require('mongoose');

//create schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,require:true
    },
    email:{
        type:String,require:true,unique:true
    },
    password:{
        type:String,require:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})

//create model
//mongoose.model() method is used to create, it accepts two arguments
//(1) name of collection(2)name of created database model name
const users = mongoose.model("users",userSchema)

//export models

module.exports=users;