const projectModel = require('../models/project.model')
const projectMembers = require('../models/projectmember.model')

interface UserControllerInterface {
    getUserProjects(req: any, res: any): Promise<void>
    createProject(req: any, res: any): Promise<void>
}

class UserController implements UserControllerInterface{
    async getUserProjects(req: any,res: any){
        const page = req.query.page
        const limit = req.query.limit

        try {
            const attendProjects = await projectMembers.find({
                userId: req.user.id
            })

            const projects = await projectModel.find({
                creator: req.user.id
            })

            for(let attendProject of attendProjects){
                projects.push(await projectModel.findOne({_id: attendProject.projectId}))
            }
            return res.send(JSON.stringify({status: 200, data: projects}))
            
        } catch (error) {
            return res.send(JSON.stringify({status: 500, message: error}))
        }
    }

    async createProject(req: any, res: any){
        const name = req.body.name
        const creator = req.user.id
        const end = req.body.deadline
        const description = req.body.description || ""

        if(!name || !end) {
            return res.send(JSON.stringify({status: 400, message: "Missing required infomation"}))
        }

        let today = new Date()
        let endDate = new Date(end)
        if(today > endDate){
            return res.send(JSON.stringify({status: 400, message: "Invalid deadline"}))
        }

        projectModel.create({
            name: name,
            description: description,
            end: end,
            creator: creator
        }, (err: Error, result: JSON) => {
            if(err){
                return res.send(JSON.stringify({status: 500, message: err}))
            }
            else{
                return res.send(JSON.stringify({status: 200, message: "Project created successfully!"}))
            }
        })
    }
}

module.exports = new UserController