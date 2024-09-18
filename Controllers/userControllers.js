const users = require('../Models/userCollection')
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

exports.getUserDetail=(req,res)=>{
    res.status(200).json("inside get user details")
}