const Express = require('express')
const Router = Express.Router()
const {ValidateJWT} = require('../middleware/jwt')
const UserControllers = require('../controllers/user.controller')

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

Router.get('/search', UserControllers.searchUser)

module.exports = Router