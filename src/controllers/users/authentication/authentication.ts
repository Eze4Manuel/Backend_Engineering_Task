
import express, { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { adminLoginSuccessTemplate } from '../../../interfaces/authenticationTemplate';
import { mysqlInvokeQuery } from '../../../database/dbmysqlConn';
import { emailNotification, extractUserDetails } from '../../../utils/functionHelpers';
import { forgotPassword_body, forgotPassword_subject, forgotPassword_title } from './_data';
var bcrypt = require('bcryptjs');
const dbConfig = require('../../../database/dbclient');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const ejs = require("ejs");

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
                const _result = await extractUserDetails(rows[0]); console.log(_result);

                // if (_result.is_admin != '0') return res.status(400)
                //     .json({
                //         msg: "Cannot access this account",
                //         status: 'failed'
                //     });
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





exports.forgotPassword = async (req: Request, res: Response) => {
    try {
        // transforming email value
        req.query.email = req.query.email?.toString().trim().toLowerCase();
        const transDate = new Date();
        transDate.setTime(transDate.getTime() + (60 * 60 * 1000))
        console.log(req.query);

        // check mysql DB for user  
        let query = `SELECT * FROM dpd_users WHERE email = '${req.query.email}'`
        mysqlInvokeQuery(query, async (rows: any) => {
            if (rows?.length > 0) {
                // generate random code
                const NEWCODE = Math.floor(Math.random() * 900000) + 100000;

                // store code and email in DB
                await dbConfig.dbClient.db(process.env.DATABASE).collection('forgot_password').updateOne({ email: req.query.email }, { $set: { email: req.query.email, code: NEWCODE } }, { upsert: true });

                // send random code to mail
                ejs.renderFile(require('path').resolve('./src') + "/views/mailTemp.ejs", {
                    subject: forgotPassword_subject,
                    body: forgotPassword_body(rows[0].first_name, rows[0].last_name, NEWCODE, transDate),
                    title: forgotPassword_title,
                }, async function (err: any, data: any) {
                    if (err) {
                        console.log(err);
                        return res.status(404).json({ msg: "Something went wrong" });
                    } else {
                        // SENDING EMAIL ---------------------------------------------------
                        await emailNotification(rows[0].email, forgotPassword_subject, data);

                        return res.status(200).json({ data: [], status: 'success', msg: 'Check mail for code' })
                    }
                })
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

exports.resetPassword = async (req: Request, res: Response) => {
    try {
        let _updatePassword;

        // formatting email
        req.body.email = req.body?.email?.toString().trim().toLowerCase();
        req.body.code = req.body?.code?.toString().trim().toLowerCase();

        const payload = await dbConfig.dbClient.db(process.env.DATABASE).collection('forgot_password').findOne({ email: req.body.email }, { projection: { code: 1 } });
        if (payload == null) return res.status(400).json({ msg: 'Code not generated. Submit email in forgot password', status: 'failed' });

        if (payload.code.toString().trim() == req.body.code) {
            _updatePassword = await bcrypt.hash(req.body.password, 12);
            // set password in mysql
            let query = `UPDATE dpd_users SET password = '${_updatePassword}' WHERE email = '${req.body.email}'`
            mysqlInvokeQuery(query, async (rows: any) => {
                if (rows.affectedRows > 0) {
                    await dbConfig.dbClient.db(process.env.DATABASE).collection('forgot_password')
                        .deleteOne({ email: req.body.email });
                    return res.status(200).json({ data: [], status: 'success', msg: 'Password reset success' })
                } else return res.status(400).json({ data: [], msg: 'password not updated' })
            })
        } else return res.status(400).json({ data: [], msg: 'Code passed is incorrect' })
    } catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong", status: 'failed' });
    }
}


