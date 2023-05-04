"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { loginToAccount, forgotPassword, resetPassword } = require('../../controllers/users/authentication/authentication');
const { validateLogin } = require('../../middleware/authenticationValidation');
const { auth } = require('../../middleware/auth');
const router = express_1.default.Router();
function routes() {
    router.post('/login/', validateLogin, loginToAccount);
    router.get('/forgot-password/', forgotPassword);
    router.post('/reset-password/', resetPassword);
    return router;
}
;
module.exports = routes;
