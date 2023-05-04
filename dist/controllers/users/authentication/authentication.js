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
const dbmysqlConn_1 = require("../../../database/dbmysqlConn");
const functionHelpers_1 = require("../../../utils/functionHelpers");
const _data_1 = require("./_data");
var bcrypt = require('bcryptjs');
const dbConfig = require('../../../database/dbclient');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const ejs = require("ejs");
exports.loginToAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // transforming email value
        req.body.email = req.body.email.trim().toLowerCase();
        // check mysql DB for user
        let query = `SELECT * FROM dpd_users WHERE email = '${req.body.email}'`;
        (0, dbmysqlConn_1.mysqlInvokeQuery)(query, (rows) => __awaiter(void 0, void 0, void 0, function* () {
            if ((rows === null || rows === void 0 ? void 0 : rows.length) > 0) {
                const _isPassword = yield bcrypt.compare(req.body.password, rows[0].password);
                if (!_isPassword)
                    return res.status(400)
                        .json({
                        msg: "Incorrect Details", status: 'failed'
                    });
                const _result = yield (0, functionHelpers_1.extractUserDetails)(rows[0]);
                console.log(_result);
                // if (_result.is_admin != '0') return res.status(400)
                //     .json({
                //         msg: "Cannot access this account",
                //         status: 'failed'
                //     });
                // Setting up token
                const _token = jwt.sign({ id: _result === null || _result === void 0 ? void 0 : _result._id, email: _result === null || _result === void 0 ? void 0 : _result.email }, process.env.TOKEN_KEYPHRASE, { expiresIn: "24h" });
                return res.status(200)
                    .json({
                    data: Object.assign(Object.assign({}, _result), { token: _token }),
                    msg: "User Login",
                    status: 'success'
                });
            }
            else
                return res.status(400)
                    .json({
                    msg: "Account not found.",
                    status: 'failed'
                });
        }));
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong", status: 'failed' });
    }
});
exports.forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // transforming email value
        req.query.email = (_a = req.query.email) === null || _a === void 0 ? void 0 : _a.toString().trim().toLowerCase();
        const transDate = new Date();
        transDate.setTime(transDate.getTime() + (60 * 60 * 1000));
        console.log(req.query);
        // check mysql DB for user  
        let query = `SELECT * FROM dpd_users WHERE email = '${req.query.email}'`;
        (0, dbmysqlConn_1.mysqlInvokeQuery)(query, (rows) => __awaiter(void 0, void 0, void 0, function* () {
            if ((rows === null || rows === void 0 ? void 0 : rows.length) > 0) {
                // generate random code
                const NEWCODE = Math.floor(Math.random() * 900000) + 100000;
                // store code and email in DB
                yield dbConfig.dbClient.db(process.env.DATABASE).collection('forgot_password').updateOne({ email: req.query.email }, { $set: { email: req.query.email, code: NEWCODE } }, { upsert: true });
                // send random code to mail
                ejs.renderFile(require('path').resolve('./src') + "/views/mailTemp.ejs", {
                    subject: _data_1.forgotPassword_subject,
                    body: (0, _data_1.forgotPassword_body)(rows[0].first_name, rows[0].last_name, NEWCODE, transDate),
                    title: _data_1.forgotPassword_title,
                }, function (err, data) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log(err);
                            return res.status(404).json({ msg: "Something went wrong" });
                        }
                        else {
                            // SENDING EMAIL ---------------------------------------------------
                            yield (0, functionHelpers_1.emailNotification)(rows[0].email, _data_1.forgotPassword_subject, data);
                            return res.status(200).json({ data: [], status: 'success', msg: 'Check mail for code' });
                        }
                    });
                });
            }
            else
                return res.status(400)
                    .json({
                    msg: "Account not found.",
                    status: 'failed'
                });
        }));
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong", status: 'failed' });
    }
});
exports.resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    try {
        let _updatePassword;
        // formatting email
        req.body.email = (_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.email) === null || _c === void 0 ? void 0 : _c.toString().trim().toLowerCase();
        req.body.code = (_e = (_d = req.body) === null || _d === void 0 ? void 0 : _d.code) === null || _e === void 0 ? void 0 : _e.toString().trim().toLowerCase();
        const payload = yield dbConfig.dbClient.db(process.env.DATABASE).collection('forgot_password').findOne({ email: req.body.email }, { projection: { code: 1 } });
        if (payload == null)
            return res.status(400).json({ msg: 'Code not generated. Submit email in forgot password', status: 'failed' });
        if (payload.code.toString().trim() == req.body.code) {
            _updatePassword = yield bcrypt.hash(req.body.password, 12);
            // set password in mysql
            let query = `UPDATE dpd_users SET password = '${_updatePassword}' WHERE email = '${req.body.email}'`;
            (0, dbmysqlConn_1.mysqlInvokeQuery)(query, (rows) => __awaiter(void 0, void 0, void 0, function* () {
                if (rows.affectedRows > 0) {
                    yield dbConfig.dbClient.db(process.env.DATABASE).collection('forgot_password')
                        .deleteOne({ email: req.body.email });
                    return res.status(200).json({ data: [], status: 'success', msg: 'Password reset success' });
                }
                else
                    return res.status(400).json({ data: [], msg: 'password not updated' });
            }));
        }
        else
            return res.status(400).json({ data: [], msg: 'Code passed is incorrect' });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong", status: 'failed' });
    }
});
