const Express = require('express')
const Router = Express.Router()
const {ValidateJWT} = require('../middleware/jwt')
const UserControllers = require('../controllers/user.controller')

const uploadFile = require('../middleware/uploadFile')

Router.use('/', (req: any,res: any,next: any) => {
    const validateJwtResult = ValidateJWT(req.query.token)
    if(validateJwtResult){
        //console.log(validateJwtResult)
        req.user = validateJwtResult
        return next()
    }   
    else{
        return res.send(JSON.stringify({status: 400, message: "invalid request, cannot verify user"}))
    }
})

Router.get('/project', UserControllers.getUserProjects)

Router.post('/project', UserControllers.createProject)

Router.put('/project', UserControllers.alterProject)

Router.delete('/project', UserControllers.deleteProject)

Router.post('/project/member', UserControllers.addProjectMember)

Router.delete('/project/member', UserControllers.deleteProjectMember)

Router.post('/project/comment', UserControllers.createProjectComment)

Router.get('/ticket', UserControllers.getProjectTickets)

Router.get('/ticket/personel', UserControllers.getUserTickets)

Router.get('/ticket/attachment', UserControllers.getTicketAttachment)

Router.post('/ticket/attachment', uploadFile.single('file'),UserControllers.uploadTicketAttachment)

Router.post('/ticket', UserControllers.createTicket)

Router.put('/ticket', UserControllers.alterTicket)

Router.delete('/ticket', UserControllers.deleteTicket)

Router.get('/comment', UserControllers.getComment)

Router.get('/search', UserControllers.searchUser)

Router.get('/info', UserControllers.getUserInfo)

module.exports = Router