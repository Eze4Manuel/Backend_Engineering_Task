
import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { log } from 'console';
const mongodbConnect = require('./database/dbconn');
const config = require('./config');
import { userDatabaseUpdater } from './scheduler/userUpdater';
import { mysqlInvokeQuery } from './database/dbmysqlConn';

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const adminAuthenticationRoutes = require('./routes/admin/authentication');
const adminAdminRoutes = require('./routes/admin/admin');
const adminConsultantRoutes = require('./routes/admin/consultants');



const userAuthenticationRoutes = require('./routes/users/authentication');
const userUserRoutes = require('./routes/users/user');
const userConsultantRoutes = require('./routes/users/consultants');


const app = express();
const httpServer = createServer(app);
const cors = require('cors');
const PORT = config.port || 5004;


app.use(cors());
app.use(bodyParser.json({ limit: '3mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));


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
    res.send("Dpd Onlinesde")
});



// Initiating SCHEDULED JOBS
userDatabaseUpdater();


// Connecting to database 
mongodbConnect()
    .then(() => httpServer.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error: any) => console.log(`${error} did not connect`));
