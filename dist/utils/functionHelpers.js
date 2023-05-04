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
exports.mailNotification = exports.emailNotification = exports.extractUserDetails = void 0;
const _data_1 = require("../controllers/users/authentication/_data");
const config = require('../config');
const extractUserDetails = (user) => {
    const obj = {
        _id: user.id,
        user_type: user.user_type,
        is_admin: user.is_admin,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        displayName: user.first_name + " " + user.last_name,
        photo_url: config.secondary_client_base_url + user.image,
        phoneNumber: user.phone,
        country: user.country_of_origin,
        gender: user.gender,
        language: user.language,
        dob: user.dob,
        is_verified: user.is_verified,
        account_type: user.account_type,
    };
    return obj;
};
exports.extractUserDetails = extractUserDetails;
const emailNotification = (email, subject, data) => __awaiter(void 0, void 0, void 0, function* () {
    _data_1.transporter.sendMail((0, exports.mailNotification)(email, subject, data), function (error, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error) {
                console.log(error);
                return { msg: "Something went wrong" };
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
});
exports.emailNotification = emailNotification;
const mailNotification = (email, subject, data) => {
    return {
        from: process.env.MAIL_EMAIL,
        to: email,
        subject: `${subject}`,
        html: `${data}`
    };
};
exports.mailNotification = mailNotification;
