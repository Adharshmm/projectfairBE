const project = require('../Models/projectSchems')
exports.addProject = async (req, res) => {
    console.log('inside add project controller')
    const userId = req.payload;
    console.log(userId)
    //requist we are getting is form data
    //so it is  not possible to dierectly access the data
    //we need to use multer module to deal with mutipart/form data
    const projectImage = req.file.filename
    const { title, language, github, website, overview } = req.body;
    try {
        const exsistingProjects = await project.findOne({ github: github })
        if (exsistingProjects) {
            res.status(409).json('Project already exsist')
        } else {
            const newProjects = new project({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId,
            })
            await newProjects.save();
            res.status(200).json('project added successfully ')
        }
    } catch (error) {
        res.status(401).json('Project upload failed')
    }
}
//1)get any 3 projects details for the homepage
exports.getHomeprojects = async (req, res) => {
    try {
        const homeProjects = await project.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (error) {
        res.status(401).json('request failed due to:', err)
    }
}
//2)get all projects
exports.allProject = async (req, res) => {
    const searchKey = req.query.search;
    console.log(searchKey)
    const serchQuery = {

        $or:[
            {
                language: {
                    $regex: searchKey,
                    //i is used to remove case sensitivity
                    $options: 'i'
                }
            },
            {
                title: {
                    $regex: searchKey,
                    //i is used to remove case sensitivity
                    $options: 'i'
                }
            }
        ]
    }
    try {
        const allUserProjects = await project.find(serchQuery);
        res.status(200).json(allUserProjects)
    } catch (error) {
        res.status(500).json('request failed due to:', err)
    }
}
//3)get all projects uploaded by that specific user
exports.getUserProjects = async (req, res) => {
    const userId = req.payload  // Ensure userId is safely extracted
    try {
        const userProjects = await project.find({ userId: userId }).limit(3)
        res.status(200).json(userProjects)
    } catch (error) {
        res.status(500).json({ message: 'Request failed', error: error.message });
    }
}
//4)project update or edit
exports.editUserProject = async(req,res) =>{
    const {id} = req.params;
    const userId = req.payload
    const {title,language,github,website,overview,projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage;
    try {
        const updateProject = await project.findByIdAndUpdate(
            {_id:id},{
                title:title,
                language:language,
                github:github,
                website:website,
                overview:overview,
                projectImage:uploadProjectImage,
                userId:userId
            },
            {
                new:true
            }
        );
        await updateProject.save()
        res.status(200).json('project edited successfully ')
    } catch (error) {
        res.status(401).json(err)
    }
}

//5) project deleting controller
exports.deleteUserProject = async(req,res)=>{
    const {id} = req.params;
    try {
        const deleteProject = await project.findByIdAndDelete({_id:id})
        res.status(200).json(deleteProject)
    } catch (error) {
        res.status(401).json(error)
    }
}
