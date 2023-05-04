import express from 'express';
const { loginToAccount, registerAccount } = require('../../controllers/admin/authentication');
const { validateLogin, validateAdminRegister } = require('../../middleware/authenticationValidation');
const { auth } = require('../../middleware/auth');

const router = express.Router();

function routes() {
    router.post('/login/', validateLogin, loginToAccount);

    return router;
};

module.exports = routes;   