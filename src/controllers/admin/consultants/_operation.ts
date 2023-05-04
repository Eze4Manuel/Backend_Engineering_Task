import { emailNotification } from "../../../utils/functionHelpers";
import { virtual_call_body, virtual_call_subject, virtual_call_title } from "./_data";

var nodemailer = require('nodemailer');
const config = require('../../../config');
const ejs = require("ejs");


export const sendScheduleEmail = async (email: string, meeting_link: string, project_title: string) => {

    // send random code to mail
    ejs.renderFile(require('path').resolve('./src') + "/views/mailTemp.ejs", {
        subject: virtual_call_subject,
        body: virtual_call_body(meeting_link, project_title),
        title: virtual_call_title,
    }, async function (err: any, data: any) {
        if (err) {
            console.log(err);
        } else {
            // SENDING EMAIL ---------------------------------------------------
            console.log('Email Sent');

            await emailNotification(email, virtual_call_subject, data);
        }
    })
}


export const sendEmailTask = async (to: string, subject: string, message: string) => {

    // send random code to mail
    ejs.renderFile(require('path').resolve('./src') + "/views/mailTemp.ejs", {
    }, async function (err: any, data: any) {
        if (err) {
            console.log(err);
        } else {
            // SENDING EMAIL ---------------------------------------------------
            console.log('Email Sent');
            await emailNotification(to, subject, message);
        }
    })
}

// // Setting up mailer credentials
// export const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: config.email.mail,
//         pass: config.email.password
//     }
// });