import { Request, Response, NextFunction } from 'express';
import { loginTemplate } from '../interfaces/authenticationTemplate';
import { validateEmail } from '../utils/validationUtil';


exports.validateLogin = (req: Request, res: Response, next: NextFunction) => {
    let login: loginTemplate = req.body;
    let _loginType = '';
    // checking if input was inserted
    if (!login.email) return res.status(400).json({ msg: 'email required', status: 'failed' });


    // checking if email
    if (validateEmail(login.email.toString()) !== null) {
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




