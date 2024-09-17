import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
async function sendEmailWithAttachment(toEmail, csvFilePath,graphFilePath) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'CSV Report',
        text: 'Please find the attached CSV report.',
        attachments: [
            {
                filename: 'report.csv',
                path: csvFilePath
            },
            {
                filename: 'webgraph.png',
                path: graphFilePath
            }
        ]
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (err) {
        console.error('Error sending email:', err);
    }
}
export{sendEmailWithAttachment};