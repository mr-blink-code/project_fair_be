const projects = require("../Models/projectCollection")

exports.addproject= async(req,res)=>{
    console.log("inside add project")
    const userId = req.payload;
    console.log("userId:-" ,userId)
    const projectImage=req.file.filename
    console.log("inage file name",projectImage)
    const {title,language,github,website,overview}=rq.body;
    try{
        const exixtingProjects = await projects.findOne({github:github});
        if(exixtingProjects){
            res.statud(409).json("Project already exists")
        }
        else{
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage
            })
        }
    }
    catch(err){
        res.status(401).json("project upload failed")
    }
}