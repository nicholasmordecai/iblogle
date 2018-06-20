import * as nodemailer from 'nodemailer';

export default class EmailController {
    public static sendEmail(from: string, subject: string, body: string) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.emailUser,
                pass: process.env.emailPassword
            }
        });

        const mailOptions = {
            from: from,
            to: 'to@email.com',
            subject: subject,
            html: body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
        });
    }
}