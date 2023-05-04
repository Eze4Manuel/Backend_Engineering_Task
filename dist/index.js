"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = require("http");
const mongodbConnect = require('./database/dbconn');
const config = require('./config');
const userUpdater_1 = require("./scheduler/userUpdater");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const adminAuthenticationRoutes = require('./routes/admin/authentication');
const adminAdminRoutes = require('./routes/admin/admin');
const adminConsultantRoutes = require('./routes/admin/consultants');
const userAuthenticationRoutes = require('./routes/users/authentication');
const userUserRoutes = require('./routes/users/user');
const userConsultantRoutes = require('./routes/users/consultants');
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const cors = require('cors');
const PORT = config.port || 5004;
app.use(cors());
app.use(body_parser_1.default.json({ limit: '3mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use('/v1/admin/auth', adminAuthenticationRoutes(app));
app.use('/v1/admin/admin', adminAdminRoutes(app));
app.use('/v1/admin/consultants', adminConsultantRoutes(app));
app.use('/v1/user/auth', userAuthenticationRoutes(app));
app.use('/v1/user/user', userUserRoutes(app));
app.use('/v1/user/consultants', userConsultantRoutes(app));
// // Routes
// app.use('/checker', (req, res) => {
//     let query = `SELECT * FROM dpd_users WHERE email = 'eze4manuel@gmail.com'`
//     mysqlInvokeQuery(query, (rows: any) => {
//         console.log(rows);
//         if (rows?.length > 0) return res.status(201).json({ data: rows, msg: 'User details fetched', status: "success" });
//         else return res.status(201).json({ data: [], msg: 'No existing user', status: "success" });
//     })
// });
// Routes
app.use('/', (req, res) => {
    res.send("Dpd Onlinesde");
});
// Initiating SCHEDULED JOBS
(0, userUpdater_1.userDatabaseUpdater)();
// Connecting to database 
mongodbConnect()
    .then(() => httpServer.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
