const projectModel = require('../models/project.model')
const projectMembers = require('../models/projectmember.model')

interface UserControllerInterface {
    getUserProjects(req: any, res: any): Promise<void>
    createProject(req: any, res: any): Promise<void>
    addProjectMember(req: any, res: any): Promise<void>
}

class UserController implements UserControllerInterface{
    async getUserProjects(req: any,res: any){
        const offset = req.query.offset || 0
        const limit = req.query.limit || Infinity

        try {
            const attendProjects = await projectMembers.find({
                userId: req.user.id
            }).skip(offset).limit(limit)

            const projects = []

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

        try{
            const result = await projectModel.create({
                name: name,
                description: description,
                end: end,
                creator: creator
            })

            const projectCreatedId = result.id

            await projectMembers.create({
                userId: creator,
                projectId: projectCreatedId
            })

            return res.send(JSON.stringify({status: 200, message: "Project created"}))
        }
        catch (e) {
            return res.send(JSON.stringify({status: 500, message: e}))
        }
        
    }

    async addProjectMember(req: any, res: any): Promise<void> {
        const newMemberId = req.body.user;
        const projectId = req.body.project;

        try {
            await projectMembers.create({
                userId: newMemberId,
                projectId: projectId
            })

            return res.send(JSON.stringify({status: 200, message: "Member added"}))
        } catch (error) {
            return res.send(JSON.stringify({status: 500, message: error}))
        }
    }
}

module.exports = new UserController