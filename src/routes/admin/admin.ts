import express from 'express';
const { getAdmin } = require('../../controllers/admin/admin');
const { auth } = require('../../middleware/auth');

const router = express.Router();

function routes() {
    router.get('/get-admin/', auth, getAdmin);
    return router;
};

module.exports = routes;   