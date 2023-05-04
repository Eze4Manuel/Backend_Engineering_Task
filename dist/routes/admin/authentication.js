"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { loginToAccount, registerAccount } = require('../../controllers/admin/authentication');
const { validateLogin, validateAdminRegister } = require('../../middleware/authenticationValidation');
const { auth } = require('../../middleware/auth');
const router = express_1.default.Router();
function routes() {
    router.post('/login/', validateLogin, loginToAccount);
    return router;
}
;
module.exports = routes;
