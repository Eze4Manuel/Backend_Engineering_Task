import express from 'express';
const { loginToAccount, forgotPassword, resetPassword } = require('../../controllers/users/authentication/authentication');
const { validateLogin } = require('../../middleware/authenticationValidation');
const { auth } = require('../../middleware/auth');

const router = express.Router();

function routes() {
    router.post('/login/', validateLogin, loginToAccount);
    router.get('/forgot-password/', forgotPassword);
    router.post('/reset-password/', resetPassword);

    return router;
};

module.exports = routes;   