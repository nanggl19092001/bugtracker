const nodemailer = require('nodemailer')

export async function sendmail(to: string, subject: string, text: string){
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'craig73@ethereal.email',
          pass: 'XNhzgcrWWJ5a3CsqzW'
      }
  });

      let info = await transporter.sendMail({
        from: 'craig73@ethereal.email', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: text, // html body
      });
}