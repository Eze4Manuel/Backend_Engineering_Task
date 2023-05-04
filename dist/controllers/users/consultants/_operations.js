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
exports.getClientDetails = void 0;
const dbmysqlConn_1 = require("../../../database/dbmysqlConn");
const getClientDetails = (req) => {
    // check mysql DB for user
    let query = `SELECT * FROM dpd_users WHERE email = '${req.email}'`;
    (0, dbmysqlConn_1.mysqlInvokeQuery)(query, (rows) => __awaiter(void 0, void 0, void 0, function* () {
        if ((rows === null || rows === void 0 ? void 0 : rows.length) > 0)
            return rows[0];
        else
            return null;
    }));
};
exports.getClientDetails = getClientDetails;
