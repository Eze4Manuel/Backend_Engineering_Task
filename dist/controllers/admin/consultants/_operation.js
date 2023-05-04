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
exports.sendEmailTask = exports.sendScheduleEmail = void 0;
const functionHelpers_1 = require("../../../utils/functionHelpers");
const _data_1 = require("./_data");
var nodemailer = require('nodemailer');
const config = require('../../../config');
const ejs = require("ejs");
const sendScheduleEmail = (email, meeting_link, project_title) => __awaiter(void 0, void 0, void 0, function* () {
    // send random code to mail
    ejs.renderFile(require('path').resolve('./src') + "/views/mailTemp.ejs", {
        subject: _data_1.virtual_call_subject,
        body: (0, _data_1.virtual_call_body)(meeting_link, project_title),
        title: _data_1.virtual_call_title,
    }, function (err, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
            }
            else {
                // SENDING EMAIL ---------------------------------------------------
                console.log('Email Sent');
                yield (0, functionHelpers_1.emailNotification)(email, _data_1.virtual_call_subject, data);
            }
        });
    });
});
exports.sendScheduleEmail = sendScheduleEmail;
const sendEmailTask = (to, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    // send random code to mail
    ejs.renderFile(require('path').resolve('./src') + "/views/mailTemp.ejs", {}, function (err, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
            }
            else {
                // SENDING EMAIL ---------------------------------------------------
                console.log('Email Sent');
                yield (0, functionHelpers_1.emailNotification)(to, subject, message);
            }
        });
    });
});
exports.sendEmailTask = sendEmailTask;
// // Setting up mailer credentials
// export const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: config.email.mail,
//         pass: config.email.password
//     }
// });
