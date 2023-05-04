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
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const isCustomAuth = token.length < 500;
            let decodedData;
            if (token && isCustomAuth) {
                decodedData = jwt.verify(token, process.env.TOKEN_KEYPHRASE);
                req.user_id = decodedData === null || decodedData === void 0 ? void 0 : decodedData.id;
                req.email = decodedData === null || decodedData === void 0 ? void 0 : decodedData.email;
            }
            else {
                decodedData = jwt.decode(token);
                req.user_id = decodedData === null || decodedData === void 0 ? void 0 : decodedData.id;
                req.email = decodedData === null || decodedData === void 0 ? void 0 : decodedData.email;
            }
            console.log(req.email);
            next();
        }
        else {
            return res.status(401).json({ msg: "Unauthorized Access" });
        }
    }
    catch (e) {
        return res.status(401).json({ msg: e });
    }
});
