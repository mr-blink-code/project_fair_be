const projects = require("../Models/projectCollection");

 /*ADD PROJECT */
exports.addproject = async (req, res) => {
  const userId = req.payload;
  const projectImage = req.file.filename;
  const { title, language, github, website, overview } = req.body;
  try {
    const exixtingProjects = await projects.findOne({ github: github });
    if (exixtingProjects) {
      res.status(409).json("Project already exists");
    } else {
      const newProject = new projects({
        title,
        language,
        github,
        website,
        overview,
        projectImage,
        userId,
      });
      await newProject.save();
      res.status(200).json("project uploded sucessfully");
    }
  } catch (err) {
    res.status(401).json("project upload failed");
}
 
}
/*DELETE PROJECT*/

exports.deleteProject = async (req,res) => {
  console.log("welcoem inside dele")
  const projectId = req.params.id;
  const userId = req.payload; //fetch user id from payload
  console.log(userId)
  console.log(projectId)

  try{
    const project = await projects.findByIdAndDelete({_id:projectId,userId:userId});

    if(!project){
      return res.status(404).json("Project not found or you do not have permission to delete this project.")
    }
    await projects.deleteOne({_id:projectId});

    res.status(200).json("Project delete successfully");
  }catch(err){
    console.error(err);
    res.status(500).json("Error deleting project");
  }
};

/*FETCH PROECT*/

  exports.getHomeProject = async (req, res)=>{
    try{
      const homeProject = await projects.find().limit(5);
      res.status(200).json(homeProject)
    }
    catch(err){
      res.send(401).json("Requestfailed due to error",err)
    }
  }
  //get all projects
  exports.getAllProject = async (req, res)=>{
    const searchKey = req.query.search;
    const searchQuery ={
      $or:[
            {language:{$regex:searchKey,$options:'i'}},
            {title:{$regex:searchKey,$options:'i'}}
          ]
    }
    
    try{
      const allProject = await projects.find(searchQuery);
      res.status(200).json(allProject)
    }
    catch(err){
      res.send(401).json("Requestfailed due to error",err)
    }
  }

  // get all projects uploded by that specific user
  exports.getUserProject = async (req, res)=>{
    const userId=req.payload;
    try{
      const userProjects = await projects.find({userId:userId});
      res.status(200).json(userProjects)
    }
    catch(err){
      res.send(401).json("Request failed due to error",err)
    }
  }
   //EDIT USER PROJECT

   exports.editUserProject = async (req,res)=>{
    console.log("Welcome its inside edit User section")
    console.log(req)
    const projectId= req.params.id;
    const userId = req.payload;
    const {title,language,github,website,overview,projectImage}=req.body;
    const uploadProjectImage=req.file?req.file.filename:projectImage;
    try{
      const updateProject = await projects.findByIdAndUpdate(
        {_id:projectId},
        {
          title:title,
          language:language,
          github:github,
          website:website,
          overview:overview,
          projectImage:uploadProjectImage,
          userId:userId
        },
        {
          new:true,
        }
      )
      await updateProject.save();
      res.status(200).json(updateProject)
    }
    catch(error){
      res.status(401).json(error)
    }
   }