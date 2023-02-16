"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const projectMod = require('../models/project.model');
const projectMembersMod = require('../models/projectmember.model');
const accountMod = require('../models/account.model');
const valCre = require('../middleware/validateCreator');
const commentMod = require('../models/comment.model');
class UserController {
    //Get projects which user attended
    getUserProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = req.query.offset || 0;
            const limit = req.query.limit || Infinity;
            try {
                const attendProjects = yield projectMembersMod.find({
                    userId: req.user.id
                }).skip(offset).limit(limit);
                const projects = [];
                for (let attendProject of attendProjects) {
                    projects.push(yield projectMod.findOne({ _id: attendProject.projectId }));
                }
                return res.send(JSON.stringify({ status: 200, data: projects }));
            }
            catch (error) {
                return res.send(JSON.stringify({ status: 500, message: error }));
            }
        });
    }
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.body.name;
            const creator = req.user.id;
            const end = req.body.deadline;
            const description = req.body.description || "";
            if (!name || !end) {
                return res.send(JSON.stringify({ status: 400, message: "Missing required infomation" }));
            }
            let today = new Date();
            let endDate = new Date(end);
            if (today > endDate) {
                return res.send(JSON.stringify({ status: 400, message: "Invalid deadline" }));
            }
            try {
                const result = yield projectMod.create({
                    name: name,
                    description: description,
                    end: end,
                    creator: creator
                });
                const projectCreatedId = result.id;
                yield projectMembersMod.create({
                    userId: creator,
                    projectId: projectCreatedId
                });
                return res.send(JSON.stringify({ status: 200, message: "Project created" }));
            }
            catch (e) {
                return res.send(JSON.stringify({ status: 500, message: e }));
            }
        });
    }
    addProjectMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMemberId = req.body.user;
            const projectId = req.body.project;
            try {
                const existMember = yield projectMembersMod.find({
                    userId: newMemberId,
                    projectId: projectId
                });
                if (existMember.length > 0) {
                    return res.send(JSON.stringify({ status: 406, message: "Member already added into project" }));
                }
                yield projectMembersMod.create({
                    userId: newMemberId,
                    projectId: projectId
                });
                return res.send(JSON.stringify({ status: 200, message: "Member added" }));
            }
            catch (error) {
                return res.send(JSON.stringify({ status: 500, message: error }));
            }
        });
    }
    searchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyword = req.query.key;
            if (!keyword) {
                return res.send(JSON.stringify({ status: 400, message: "Missing searching information" }));
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
            }, {
                password: 0
            }, (error, result) => {
                if (error) {
                    return res.send(JSON.stringify({ status: 500, message: error }));
                }
                return res.send(JSON.stringify({ status: 200, data: result }));
            });
        });
    }
    deleteProjectMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body.id;
            const project = req.body.project_id;
            if (!user || !project) {
                return res.send(JSON.stringify({ status: 400, message: "Missing information" }));
            }
            try {
                if (!valCre(req.user.id, project)) {
                    return res.send(JSON.stringify({ status: 401, message: "Only creator can add member to this project" }));
                }
                projectMembersMod.deleteOne({
                    userId: user,
                    projectId: project
                }, (error, result) => {
                    if (error) {
                        return res.send(JSON.stringify({ status: 500, message: error }));
                    }
                    return res.send(JSON.stringify({ status: 200, message: result }));
                });
            }
            catch (e) {
                return res.send(JSON.stringify({ status: 500, message: e }));
            }
        });
    }
    deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = req.body.id;
            if (!project) {
                return res.send(JSON.stringify({ status: 400, message: "Missing information" }));
            }
            try {
                if (!valCre(req.user.id, project)) {
                    return res.send(JSON.stringify({ status: 401, message: "Only creator can add member to this project" }));
                }
                projectMod.deleteOne({
                    _id: project
                }, (error, result) => {
                    if (error) {
                        return res.send(JSON.stringify({ status: 500, message: error }));
                    }
                    projectMembersMod.deleteMany({
                        projectId: project
                    }, (error, result) => {
                        if (error) {
                            return res.send(JSON.stringify({ status: 500, message: error }));
                        }
                        return res.send(JSON.stringify({ status: 200, message: result }));
                    });
                });
            }
            catch (error) {
                return res.send(JSON.stringify({ status: 500, message: error }));
            }
        });
    }
    alterProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = req.body.projectId;
            const name = req.body.name;
            const description = req.body.description || " ";
            const end = req.body.end;
            if (!project || !end || !name) {
                return res.send(JSON.stringify({ status: 400, message: "Missing important infomation" }));
            }
            try {
                if (!valCre(req.user.id, project)) {
                    return res.send(JSON.stringify({ status: 401, message: "Only creator can make change to this project" }));
                }
                projectMod.updateOne({
                    _id: project
                }, {
                    name: name,
                    description: description,
                    end: end
                }, (err, result) => {
                    if (err) {
                        return res.send(JSON.stringify({ status: 500, message: err }));
                    }
                    else {
                        return res.send(JSON.stringify({ status: 200, message: "project updated" }));
                    }
                });
            }
            catch (error) {
                return res.send(JSON.stringify({ status: 500, message: error }));
            }
        });
    }
    createProjectComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = req.app.get('socketio');
            const sender = req.user.id;
            const content = req.body.content;
            const type = req.body.type;
            const receiveId = req.body.receiveId;
            if (!sender || !content || !type || !receiveId) {
                return res.send(JSON.stringify({ status: 401, message: "Missing infomation" }));
            }
            try {
                commentMod.create({
                    sender: sender,
                    content: content,
                    type: type,
                    receiveId: receiveId
                }, (err, result) => {
                    if (err) {
                        return res.send(JSON.stringify({
                            status: 500, message: err
                        }));
                    }
                    io.to(receiveId).emit("message", result);
                    return res.send(JSON.stringify({ status: 200, message: result }));
                });
            }
            catch (error) {
                return res.send(JSON.stringify({
                    status: 500, message: error
                }));
            }
        });
    }
}
module.exports = new UserController;
