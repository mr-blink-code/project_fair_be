const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwt middle");
    console.log(req.headers);
    const token = req.headers['authorization'].split(' ')[1];
    console.log("TOKEN:-",token)
    try{
        const jwtResponse = jwt.verify(token,"bbroygbhvw2024");
        console.log(jwtResponse)
        req.payload = jwtResponse.userId;
        next();
    }
    catch(err){
        console.log(err)
        res.status(401,"Authorization failed ,please login")
    }
}
module.exports=jwtMiddleware