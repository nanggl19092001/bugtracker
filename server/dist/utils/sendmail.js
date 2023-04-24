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
exports.sendmail = void 0;
const nodemailer = require('nodemailer');
function sendmail(to, subject, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const testAccount = yield nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'craig73@ethereal.email',
                pass: 'XNhzgcrWWJ5a3CsqzW'
            }
        });
        let info = yield transporter.sendMail({
            from: 'craig73@ethereal.email',
            to: to,
            subject: subject,
            html: text, // html body
        });
    });
}
exports.sendmail = sendmail;
