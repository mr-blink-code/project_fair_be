const multer = require('multer')
//create storage
console.log("inside multer")
const storage=multer.diskStorage({
    //it consist of 2 keys (1) distination (2) filename
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const fileName= `image-${Date.now()}-${file.originalname}`
        console.log(fileName)
        callback(null,fileName)
    }
})

//implement file filter

const fileFilter = (req,file,callback)=>{
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new ErrorEvent("only png,jpeg,fpg files are alloweded"))
    }
}

const multerConfig =multer({
    storage,
    fileFilter
})

module.exports = multerConfig