import express, { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

// import { Admin, User } from '../../classes/user';
import { adminLoginSuccessTemplate } from '../../interfaces/authenticationTemplate';
import { mysqlInvokeQuery } from '../../database/dbmysqlConn';
import { extractUserDetails } from '../../utils/functionHelpers';
// import { insertLogger } from '../../utils/dbHelpers';
// import { authenticationLogger } from '../app/authentication/_operations';
var bcrypt = require('bcryptjs');
const dbConfig = require('../../database/dbclient');
const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.loginToAccount = async (req: Request, res: Response) => {
    try {
        // transforming email value
        req.body.email = req.body.email.trim().toLowerCase();

        // check mysql DB for user
        let query = `SELECT * FROM dpd_users WHERE email = '${req.body.email}'`
        mysqlInvokeQuery(query, async (rows: any) => {
            if (rows?.length > 0) {

                const _isPassword = await bcrypt.compare(req.body.password, rows[0].password);
                if (!_isPassword) return res.status(400)
                    .json({
                        msg: "Incorrect Details", status: 'failed'
                    });
                const _result = await extractUserDetails(rows[0]);
                if (_result.is_admin != '1') return res.status(400)
                    .json({
                        msg: "Cannot access this account",
                        status: 'failed'
                    });
                // Setting up token
                const _token = jwt.sign({ id: _result?._id, email: _result?.email }, process.env.TOKEN_KEYPHRASE, { expiresIn: "24h" });

                return res.status(200)
                    .json({
                        data: { ..._result, token: _token },
                        msg: "User Login",
                        status: 'success'
                    });
            }
            else return res.status(400)
                .json({
                    msg: "Account not found.",
                    status: 'failed'
                });
        })
    } catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong", status: 'failed' });
    }
}


