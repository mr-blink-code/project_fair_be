const projects = require("../Models/projectCollection");

exports.addproject = async (req, res) => {
  console.log("inside add project");
  const userId = req.payload;
  console.log("userId:-", userId);
  const projectImage = req.file.filename;
  console.log("inage file name", projectImage);
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
  //1.get any  3 projects details form home page
}
  exports.getHomeProject = async (req, res)=>{
    try{
      const homeProject = await projects.find().limit(3);
      res.status(200).json(homeProject)
    }
    catch(err){
      res.send(401).json("Requestfailed due to error",err)
    }
  }
  //get all projects
  exports.getAllProject = async (req, res)=>{
    try{
      const allProject = await projects.find();
      res.status(200).json(allProject)
    }
    catch(err){
      res.send(401).json("Requestfailed due to error",err)
    }
  }

  // get all projects uploded by that specific user
  exports.getUserProject = async (req, res)=>{
    try{
      const alluserProject = await projects.find({userId:userId});
      res.status(200).json(alluserProject)
    }
    catch(err){
      res.send(401).json("Requestfailed due to error",err)
    }
  }