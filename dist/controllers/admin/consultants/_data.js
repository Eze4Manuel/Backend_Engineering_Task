"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.virtual_call_body = exports.virtual_call_title = exports.virtual_call_subject = void 0;
exports.virtual_call_subject = 'DPD Request a Consultant';
exports.virtual_call_title = 'DPD Request a Consultant';
const virtual_call_body = (meeting_link, project_title) => {
    return `
    <div>
        <p>Hello,</p>
        <p>We received you request for a consultant to handle your project, <strong>${project_title}</strong>. Inorder for us to better understand the scope and details of the project,
        we will like to schedule a call with you at your own convienience. 
        </p>
        <p>Plesae schedule a call with us when you are available by clicking the link below</p>
        <a href="${meeting_link}">Click here to schedule call a time</a>
        <p>
            Thank you for your Time.
            Yours Sincerly,
            Dpd Online Platform.
        </p>
        <p><b>Thank you.</b></p>
    </div>
    `;
};
exports.virtual_call_body = virtual_call_body;
