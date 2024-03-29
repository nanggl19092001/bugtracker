import { Express } from "express"

const logger = require('../utils/logger')
const IndexController = require('../controllers/index.controller')
const UserRouter = require('./user.route')
const jwt = require('jsonwebtoken')

function route(app: Express) {

    app.use('/user', UserRouter)

    app.post('/auth/signin', IndexController.signIn)

    app.get('/auth/signin', IndexController.checkSignUp)
    
    app.post('/auth/signup', IndexController.signUp)

    app.post('/auth/email/verify', IndexController.verifyEmailToken)

    app.post('/auth/email', IndexController.getVerifyEmailToken)

    
    app.get('/', (req: any,res: any) => {
        return res.render('home')
    })
}

module.exports = route