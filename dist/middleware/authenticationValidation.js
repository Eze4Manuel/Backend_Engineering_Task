"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationUtil_1 = require("../utils/validationUtil");
exports.validateLogin = (req, res, next) => {
    let login = req.body;
    let _loginType = '';
    // checking if input was inserted
    if (!login.email)
        return res.status(400).json({ msg: 'email required', status: 'failed' });
    // checking if email
    if ((0, validationUtil_1.validateEmail)(login.email.toString()) !== null) {
        _loginType = 'email';
    }
    // checking password
    if (!login.password) {
        return res.status(400).json({ msg: 'password required', status: 'failed' });
    }
    // specifying the login mode
    req.body.type = _loginType;
    next();
};
