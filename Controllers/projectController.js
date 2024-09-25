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
};
