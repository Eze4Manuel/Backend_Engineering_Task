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
const dbmysqlConn_1 = require("../../database/dbmysqlConn");
const functionHelpers_1 = require("../../utils/functionHelpers");
// import { insertLogger } from '../../utils/dbHelpers';
// import { authenticationLogger } from '../app/authentication/_operations';
var bcrypt = require('bcryptjs');
const dbConfig = require('../../database/dbclient');
const jwt = require('jsonwebtoken');
const config = require('../../config');
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
                if (_result.is_admin != '1')
                    return res.status(400)
                        .json({
                        msg: "Cannot access this account",
                        status: 'failed'
                    });
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
