const nodemailer = require('nodemailer');
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

const sendMail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        oauth2Client.setCredentials({
            refresh_token: process.env.GMAIL_REFRESH_TOKEN
        });
        const accessToken = oauth2Client.getAccessToken();
    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'oauth2',
                user: process.env.GMAIL_ADDRESS,
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken: accessToken,
            }
        });
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Failed to send email');
                console.log(error);
                resolve(false);
            } else {
                console.log('Email sent: ' + info.response);
                
                console.log("info ===> ");
                console.log(info);
                resolve(true);
            }
        });
    });
}

module.exports = {
    sendMail,
}