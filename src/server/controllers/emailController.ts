import * as nodemailer from 'nodemailer';

export default class EmailController {
    public static sendEmail(from: string, subject: string, body: string, callback: Function) {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.emailUser,
                pass: process.env.emailPassword
            }
        });

        const mailOptions = {
            from: from,
            to: process.env.emailUser,
            subject: subject,
            html: body
        };

        transporter.sendMail(mailOptions, callback);
    }
}