//import momgoose
const mongoose =require('mongoose');

//create schema
const projectCollection=new mongoose.Schema({
    title:{
        type:String,require:true
    },
    overview:{
        type:String,require:true
    },
    website:{
        type:String,require:true
    },
    github:{
        type:String,require:true
    },
    projectImage:{
        type:String,require:true
    },
    language:[{
        type:String,require:true
    }],
    userId:{
        type:String,require:true
    }
},{timestamps:true});

//create model
//mongoose.model() method is used to create, it accepts two arguments
//(1) name of collection(2)name of created database model name
const projects = mongoose.model("projects",projectCollection    )

//export models

module.exports=projects;