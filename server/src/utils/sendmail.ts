const nodemailer = require('nodemailer')
require('dotenv').config()

export async function sendmail(to: string, subject: string, text: string){
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
      }
  });

      let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: text, // html body
      });
}