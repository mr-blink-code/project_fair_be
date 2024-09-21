const users = require('../Models/userCollection')
const jwt = require('jsonwebtoken')
exports.register= async(req,res)=>{
    //console.log(req.body)
    const {username,email,password}=req.body;
    //check email id avilable or not
    try{
        const existingUser= await users.findOne({email:email})
        if(existingUser){
            res.status(400).json("Account already exists")
        }
        else{
            console.log("user not exist")
            const newUser = new users({
                username : username,
                email:email,
                password:password,
                github: "",
                linkedin: "",
                profile: "",
    
            })
            await newUser.save();
            res.status(200).json("User Registered Successfully")
            }
    }
    catch(err){
            res.status(401).json("User Registration failed due to",err)
    }
    
}

exports.login= async(req,res)=>{

    const {email,password}=req.body;
    //check email id avilable or not
    try{
        const existingUser= await users.findOne({email:email,password:password});
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"bbroygbhvw2024");
            console.log("token")
           res.status(200).json({data:existingUser,token:token})
        }
        else{
            res.status(401).json("Invalid email or password")
            }
    }
    catch(err){
            res.status(501).json("internal server error",err)
    }
    
}


exports.getUserDetail=(req,res)=>{
    res.status(200).json("inside get user details")
}