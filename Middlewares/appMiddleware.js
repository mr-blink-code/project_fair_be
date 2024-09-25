const appMiddleware = (req,res,next)=>{
    console.log("Inside app middle");
    next();
}
module.exports=appMiddleware