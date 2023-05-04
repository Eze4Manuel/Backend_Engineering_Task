"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.forgotPassword_body = exports.forgotPassword_title = exports.forgotPassword_subject = void 0;
var nodemailer = require('nodemailer');
const config = require('../../../config');
exports.forgotPassword_subject = 'Account Password Reset';
exports.forgotPassword_title = 'Account Password Reset';
const forgotPassword_body = (first_name, last_name, code, date) => {
    return `
    <div>
        <p>Hi ${first_name} ${last_name},</p>
        <p>You requested a password reset for your Dpd platform account at ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} on ${date.toDateString()}
        </p>
        <p>To reset your account password, use the code below.</p>
        <h2>${code}</h2>
        <p>
            If this mail did not originate from you, kindly contact us by
            sending a mail to info@dpdonline.ng or chat with us on whatsapp +234 999 211 2222.
        </p>
        <p><b>Thank you.</b></p>
    </div>
    `;
};
exports.forgotPassword_body = forgotPassword_body;
// Setting up mailer credentials
exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email.mail,
        pass: config.email.password
    }
});
