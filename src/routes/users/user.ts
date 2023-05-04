import express from 'express';
const { getUser } = require('../../controllers/users/user');
const { auth } = require('../../middleware/auth');

const router = express.Router();

function routes() {
    router.get('/get-user/', auth, getUser);
    return router;
};

module.exports = routes;   