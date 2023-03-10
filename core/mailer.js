// const nodemailer = require('nodemailer');
// const { google } = require("googleapis");

// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//     process.env.GMAIL_CLIENT_ID,
//     process.env.GMAIL_CLIENT_SECRET,
//     "https://developers.google.com/oauthplayground"
// );

// const sendMail = (mailOptions) => {
//     return new Promise((resolve, reject) => {
//         oauth2Client.setCredentials({
//             refresh_token: process.env.GMAIL_REFRESH_TOKEN
//         });
//         const accessToken = oauth2Client.getAccessToken();
    
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 type: 'oauth2',
//                 user: process.env.GMAIL_ADDRESS,
//                 clientId: process.env.GMAIL_CLIENT_ID,
//                 clientSecret: process.env.GMAIL_CLIENT_SECRET,
//                 refreshToken: process.env.GMAIL_REFRESH_TOKEN,
//                 accessToken: accessToken,
//             }
//         });
    
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log('Failed to send email');
//                 console.log(error);
//                 resolve(false);
//             } else {
//                 console.log('Email sent: ' + info.response);
                
//                 console.log("info ===> ");
//                 console.log(info);
//                 resolve(true);
//             }
//         });
//     });
// }
const path = require('path')
const ejs = require('ejs')
const sendgrid = require('@sendgrid/mail')
require('dotenv').config();
const sendEmail = async (to, subject, template, data) => {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');
    const from = process.env.MAIL_SENDER_EMAIL || "lee@aerovision.io";
    const html = await ejs.renderFile<string>(path.join(__dirname, `../mail-templates/${template}.ejs`), data);
    let message = { from, to, subject, html };
    const msg = { ...message, text: 'Nimedix'};
  
    try {
        await sendgrid.send(msg);
        return true
    } catch (error) {
        console.log(error);
        throw error;
    }
  };

module.exports = {
    sendEmail,
}
