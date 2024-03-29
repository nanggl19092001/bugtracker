const logger = require('../utils/logger')
const LogMess = require('../utils/logformat')
import { Verify } from 'crypto'
import { resolveSoa } from 'dns'
import accountModel from '../models/account.model'
import ticketModel from '../models/ticket.model'
import tokenModel from '../models/verify.model'
import { genToken } from '../utils/gentoken'
import { sendmail } from '../utils/sendmail'
const regexEmail = require('../utils/constants')
const bcrypt = require('bcrypt')
const JwtMiddleware = require('../middleware/jwt')

const verifyOauth2Token = require('../middleware/googleOauth2')

interface IndexControllerInterface {
    signIn(req: any, res: any): Promise<void>
    signUp(req: any, res: any): Promise<void>
    checkSignUp(req: any, res: any): Promise<void>
    auth(req: any, res: any): Promise<void>
    getVerifyEmailToken(req: any, res: any): Promise<void>
    verifyEmailToken(req: any, res: any): Promise<void>
}

class IndexController implements IndexControllerInterface{
    loginPage(req: any,res: any){
        logger.info(LogMess('GET',req.route.path))
        res.render('login')
    }

    async signIn(req: any, res: any): Promise<void>{

        const email = req.body.email
        const password = req.body.password

        accountModel.findOne({email: email})
        if(!email || !password){
            return res.send(JSON.stringify({status: 500, message: "Missing infomation"}))
        }
        try {
            const result = await accountModel.findOne({email: email})
            if(!result) {
                return res.send(JSON.stringify({status: 404, message: "Invalid account"}))
            }

            const validPassword = await bcrypt.compare(password, result.password)
            if(validPassword){
                const data = {
                    email: result.email,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    id: result._id
                }
                const jwtAccessToken = JwtMiddleware.SignJWT(data)
                return res.send(JSON.stringify({status: 200, message: "Login successfully", access_token: jwtAccessToken}))
            }

            return res.send(JSON.stringify({status: 400, message: "Wrong password"}))

        } catch (error) {
            return res.send(JSON.stringify({status: 500, exception: error}))
        }
    }

    async signUp(req: any, res: any): Promise<void>{
        const email = req.body.email
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const password = req.body.password

        if(!email || !firstname || !lastname || !password){
            return res.send(JSON.stringify({status: 400, message: "missing infomation"}))
        }
        if(!regexEmail.test(email)){
            return res.send(JSON.stringify({status: 400, message: "invalid email"}))
        }

        try{

            bcrypt.hash(password, 10).then(async (hashed: any) => {

                const result = await accountModel.create({
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    password: hashed
                })
                .then(() => {
                    return res.send(JSON.stringify({status: 200, message: "Account create successfully!"}))
                })
                .catch((e: any) => {
                    return res.send(JSON.stringify({status: 500, message: e}))
                })

                console.log(result)
            })
        }
        catch (e){
            return res.send(JSON.stringify({status: 500, exception: e}))
        }
    }

    async checkSignUp(req: any, res: any): Promise<void> {

        const token = req.query.token;
        const clientId = req.query.id;

        if(!token || !clientId){
            return res.status(401).send({status: 401, message: "Missing infomation"})
        }

        const clientResult = await verifyOauth2Token(clientId, token)

        if(!clientResult){
            return res.send(JSON.stringify({status: 400, message: "Cannot verify user"}))
        }

        const email = clientResult.email
        const firstname = clientResult.given_name
        const lastname = clientResult.family_name

        try {
            const result = await accountModel.findOne({
                email: email
            })

            if(!result){

                accountModel.create({
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    oauth: true
                }, (err: any, resAccount: any) => {

                    if(err){
                        res.status(500).send(JSON.stringify({
                            stats: 500, message: "Server error"
                        }))
                    }

                    const data = {
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        id: resAccount._id
                    }
                    const jwtAccessToken = JwtMiddleware.SignJWT(data)
                    return res.status(200).send(JSON.stringify({status: 200, access_token: jwtAccessToken}))
                })
            }
            else{
                const data = {
                    email: result.email,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    id: result._id
                }
                const jwtAccessToken = JwtMiddleware.SignJWT(data)
                return res.send(JSON.stringify({status: 200, userFound: true, access_token: jwtAccessToken}))
            }
        } catch (error) {
            return res.send(JSON.stringify({status: 500, meessage: "Server error"}));
        }
    }

    async getVerifyEmailToken(req: any, res: any){
        const email = req.body.email

        if(!email){
            return res.status(400).send(JSON.stringify({
                status: 400,
                message: "Missing infomation"
            }))
        }

        try {
            const token = genToken()

            await sendmail(email, 'Verify token', "Your verify token is " + token + ", token will expired after 5 minutes")

            await tokenModel.create({
                token: token,
                email: email,
                end: Date.now() + 1000*60*5
            })

            return res.status(200).send(JSON.stringify({
                status: 200,
                message: "Token send successfully"
            }))

        } catch (error) {
            if(error){
                return res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Server error"
                }))
            }    
        }
    }

    async verifyEmailToken(req: any, res: any): Promise<void> {
        const email = req.body.email
        const token = req.body.token

        try {
            const result = await tokenModel.findOne({
                email: email,
                token: token
            })

            if(!result){
                return res.status(404).send(JSON.stringify({
                    status: 404,
                    message: "Token not found"
                }))
            }

            const expiredDate = new Date(result.end)

            if(expiredDate < new Date()) {
                return res.status(400).send(JSON.stringify({
                    status: 400,
                    message: "Token expired"
                }))
            }

            await tokenModel.deleteMany({
                email: email
            })

            return res.status(200).send(JSON.stringify({
                status: 200,
                message: "Email verify successfully"
            }))
        } catch (error) {
            if(error){
                return res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Server error"
                }))
            }
        }
    }

    async auth(req: any, res: any): Promise<void>{
        return res
    }
}

module.exports = new IndexController