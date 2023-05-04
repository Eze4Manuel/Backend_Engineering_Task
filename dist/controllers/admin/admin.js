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
const mock_data_1 = require("../../config/mock_data");
const config = require('../../database/dbclient');
exports.getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.NODE_ENVN == 'development')
            return res.status(200)
                .json({
                data: mock_data_1.userData,
                msg: "User Details Fetched",
                status: 'success'
            });
        // check mysql DB for user
        let query = `SELECT * FROM dpd_users WHERE email = '${req.email}'`;
        (0, dbmysqlConn_1.mysqlInvokeQuery)(query, (rows) => __awaiter(void 0, void 0, void 0, function* () {
            if ((rows === null || rows === void 0 ? void 0 : rows.length) > 0) {
                const _result = yield (0, functionHelpers_1.extractUserDetails)(rows[0]);
                console.log(_result);
                return res.status(200)
                    .json({
                    data: Object.assign({}, _result),
                    msg: "User Details Fetched",
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
        res.status(500).json({ msg: "Something went wrong" });
    }
});
