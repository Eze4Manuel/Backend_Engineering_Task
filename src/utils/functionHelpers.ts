
import { transporter } from "../controllers/users/authentication/_data"
const config = require('../config');

export const extractUserDetails = (user: any) => {
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
    }
    return obj;
}



export const emailNotification = async (email: string, subject: string, data: string) => {
    transporter.sendMail(mailNotification(email, subject, data), async function (error: any, info: { response: string; }) {
        if (error) {
            console.log(error);
            return { msg: "Something went wrong" };
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}


export const mailNotification = (email: any, subject: string, data: string) => {
    return {
        from: process.env.MAIL_EMAIL,
        to: email,
        subject: `${subject}`,
        html: `${data}`
    };
}
