import { Socket } from "socket.io"
const fs = require('fs')
const path = require('path')

const projectMod = require('../models/project.model')
const projectMembersMod = require('../models/projectmember.model')
const accountMod = require('../models/account.model')
const valCre = require('../middleware/validateCreator')
const commentMod = require('../models/comment.model')
const ticketMod = require('../models/ticket.model')

interface UserControllerInterface {
    getUserProjects(req: any, res: any): Promise<void>
    createProject(req: any, res: any): Promise<void>
    addProjectMember(req: any, res: any): Promise<void>
    searchUser(req: any, res: any): Promise<void>
    deleteProjectMember(req: any, res: any): Promise<void>
    deleteProject(req: any, res: any): Promise<void>
    alterProject(req: any, res: any): Promise<void>
    createProjectComment(req: any, res: any): Promise<void>

    getTicket(req: any, res: any): Promise<void>
    getUserTickets(req: any, res: any): Promise<void>
    createTicket(req: any, res: any): Promise<void>
    alterTicket(req: any, res: any): Promise<void>
    deleteTicket(req: any, res: any): Promise<void>
    uploadTicketAttachment(req: any, res: any): Promise<void>
    createTicketComment(req: any, res: any): Promise<void>
}

class UserController implements UserControllerInterface{

    //Get projects which user attended
    async getUserProjects(req: any,res: any){
        const offset = req.query.offset || 0
        const limit = req.query.limit || Infinity

        try {
            const attendProjects = await projectMembersMod.find({
                userId: req.user.id
            }).skip(offset).limit(limit)

            const projects = []

            for(let attendProject of attendProjects){
                projects.push(await projectMod.findOne({_id: attendProject.projectId}))
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
            const result = await projectMod.create({
                name: name,
                description: description,
                end: end,
                creator: creator
            })

            const projectCreatedId = result.id

            await projectMembersMod.create({
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
            const existMember = await projectMembersMod.find(
                {
                    userId: newMemberId,
                    projectId: projectId
                }
            )

            if(existMember.length > 0){
                return res.send(JSON.stringify({status: 406, message: "Member already added into project"}))
            }

            await projectMembersMod.create({
                userId: newMemberId,
                projectId: projectId
            })

            return res.send(JSON.stringify({status: 200, message: "Member added"}))
        } catch (error) {
            return res.send(JSON.stringify({status: 500, message: error}))
        }
    }

    async searchUser(req: any, res: any): Promise<void> {
        const keyword = req.query.key

        if(!keyword){
            return res.send(JSON.stringify({status: 400, message: "Missing searching information"}))
        }

        const regexForFindingUser = new RegExp(`${keyword}`, "i");
        accountMod.find({
            $or: [
                {
                    email: regexForFindingUser
                },
                {
                    firstname: regexForFindingUser
                },
                {
                    lastname: regexForFindingUser
                }
            ]
        },{
              password: 0  
        }, (error: any, result: any) => {
            if(error){
                return res.send(JSON.stringify({status: 500, message: error}))
            }

            return res.send(JSON.stringify({status: 200, data: result}))
        })
    }

    async deleteProjectMember(req: any, res: any): Promise<void> {
        const user = req.body.id;
        const project = req.body.project_id
        
        if(!user || !project){
            return res.send(JSON.stringify({status: 400, message: "Missing information"}))
        }
        try{
            if(!valCre(req.user.id, project)){
                return res.send(JSON.stringify({status: 401, message: "Only creator can add member to this project"}))
            }
    
            projectMembersMod.deleteOne({
                userId: user,
                projectId: project
            }, (error: any, result: any) => {
                if(error){
                    return res.send(JSON.stringify({status: 500, message: error}))
                }
    
                return res.send(JSON.stringify({status: 200, message: result}))
            })
        } catch (e) {
            return res.send(JSON.stringify({status: 500, message: e}))
        }
        
    }

    async deleteProject(req: any, res: any): Promise<void> {
        const project = req.body.id

        if(!project) {
            return res.send(JSON.stringify({status: 400, message: "Missing information"}))
        }

        try {
            if(!valCre(req.user.id, project)){
                return res.send(JSON.stringify({status: 401, message: "Only creator can add member to this project"}))
            }

            projectMod.deleteOne({
                _id: project
            }, (error: any, result: any) => {
                if(error){
                    return res.send(JSON.stringify({status: 500, message: error}))
                }
                else{
                    projectMembersMod.deleteMany({
                        projectId: project
                    }, (error: any, result: any) => {
                        if(error){
                            return res.send(JSON.stringify({status: 500, message: error}))
                        }
            
                        return res.send(JSON.stringify({status: 200, message: result}))
                    })
                }
            })
        } catch (error) {
            return res.send(JSON.stringify({status: 500, message: error}))
        }

        
    }

    async alterProject(req: any, res: any): Promise<void> {

        const project: string = req.body.projectId;
        const name: string = req.body.name
        const description: string = req.body.description || " ";
        const end: Date = req.body.end;

        if(!project || !end ||!name){
            return res.send(JSON.stringify({status: 400, message: "Missing important infomation"}))
        }

        let today = new Date()
        let endDate = new Date(end)
        if(today > endDate){
            return res.send(JSON.stringify({status: 400, message: "Invalid deadline"}))
        }

        try {

            if(!valCre(req.user.id, project)){
                return res.send(JSON.stringify({status: 401, message: "Only creator can make change to this project"}))
            }

            projectMod.updateOne(
                {
                    _id: project
                },
                {
                    name: name,
                    description: description,
                    end: end
                },
                (err: any, result: any) => {
                    if(err){
                        return res.send(JSON.stringify({status: 500, message: err}))
                    }
                    else{
                        return res.send(JSON.stringify({status: 200, message: "project updated"}))
                    }
                }
            )

        } catch (error) {
            return res.send(JSON.stringify({status: 500, message: error}))
        }
    }

    async createProjectComment(req: any, res: any): Promise<void> {
        const io: Socket = req.app.get('socketio')
        
        const sender = req.user.id;
        const content = req.body.content;
        const type = req.body.type;
        const receiveId = req.body.receiveId;

        if(!sender || !content || !type || !receiveId){
            return res.send(JSON.stringify({status: 401, message: "Missing infomation"}))
        }

        try {
            commentMod.create({
                sender: sender,
                content: content,
                type: type,
                receiveId: receiveId
            }, (err: any, result: any) => {
                if(err) {
                    return res.send(JSON.stringify({
                        status: 500, message: err
                    }))
                }
                
                io.to(receiveId).emit("message", result)
                return res.send(JSON.stringify({status: 200, message: result}))
            })
        } catch (error) {
            return res.send(JSON.stringify({
                status: 500, message: error
            }))
        }
    }

    async getTicket(req: any, res: any){

    }

    async getUserTickets(req: any, res: any){
        const user = req.user.id

        ticketMod.find({
            $or: [
                {createor: user},
                {asignee: user}
            ]
        }, (error: any, result: any) => {
            if(error)
                return res.status(500).send(JSON.stringify({status: 500, message: "Bad request"}))

                //if success
                return res.status(200).send(JSON.stringify({
                    status: 200, data: result
                }))
        })
    }

    async getProjectTickets(req: any, res: any){
        const project = req.query.id;

        ticketMod.find({
            project: project
        }, (error: any, result: any) => {
            if(error)
                return res.status(500).send(JSON.stringify({status: 500, message: error}))
            
            return res.status(200).send(JSON.stringify({status: 200, data: result}))
        })
    }

    async createTicket(req: any, res: any){

        const creator = req.user.id;
        
        const project = req.body.project
        const summary = req.body.summary
        const description = req.body.description || ""
        const severity = req.body.severity
        const asignee = req.body.asignee
        const version = req.body.version
        const deadline = req.body.deadline || 0

        if(!summary || !severity || !asignee || !version){
            return res.status(401).send({status: 401, message: "Missing required infomation!"})
        }

        if(deadline != 0){
            const UTCDeadline = new Date(deadline)
            const UTCCurrentTime = new Date()
            if(UTCCurrentTime > UTCDeadline){
                return res.status(401).send({status: 401, messate: "Invalid deadline!"})
            }
        }

        try {

            const result = projectMembersMod.findOne({
                userId: user,
                projectId: project
            })

            if(!result){
                return res.status(404).send({status: 404, message: "User not found in this project"})
            }

            ticketMod.create({
                creator: creator,
                project: project,
                summary: summary,
                description: description,
                severity: severity,
                asignee: asignee,
                version: version,
                deadline: deadline
            },(err: any, result: any) => {
                if(err) 
                    return res.status(500).send({status: 500, message: "bad query"})
                return res.status(200).send({status: 200, message: "ticket created"})
            })

        } catch (error) {
            return res.status(500).send({status: 500, message: error})
        }
    }

    async alterTicket(req: any, res: any){

        const ticketId = req.body.id;

        const summary = req.body.summary
        const description = req.body.description || ""
        const severity = req.body.severity
        const version = req.body.version
        const deadline = req.body.deadline || 0

        try {
            const result = await ticketMod.findOne({
                _id: ticketId
            })

            if(!result){
                return res.status(404).send(JSON.stringify({status: 404, message: "Ticket not found !"}))
            }

            ticketMod.updateOne(
                {
                    _id: ticketId
                },
                {
                    summary: summary,
                    description: description,
                    severity: severity,
                    version: version,
                    deadline: deadline
                },
                (error: any, result: any) => {
                    if(error)
                        return res.status(500).send(JSON.stringify({status: 500, message: error}))

                    return res.status(200).send(JSON.stringify({status: 200, data: result}))
                }
            )
        } catch (error) {
            return res.status(500).send(JSON.stringify({status: 500, message: error}))
        }
    }

    async deleteTicket(req: any, res: any){

    }

    async createTicketComment(req: any, res: any){

    }

    async uploadTicketAttachment(req: any, res: any){
            try {
                if(!fs.existsSync(path.join(__dirname, '../../public/files/' + req.body.id))){
                    fs.renameSync(path.join(__dirname, '../../public/files/temp'), path.join(__dirname, '../../public/files/' + req.body.id))
                }
                else{
                    fs.renameSync(req.file.path, path.join(__dirname, '../../public/files/' + req.body.id + '/' + req.file.originalname))
                    // fs.unlinkSync(req.file.path)
                }
            } catch (error) {
                return res.status(500).send({status: 500, message: "Server upload error, maybe your file name already existed in this ticket"})
            }
            return res.status(200).send({status: 200, message: "File uploaded successfully"})
    }
}

module.exports = new UserController