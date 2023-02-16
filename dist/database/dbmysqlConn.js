"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlInvokeQuery = exports.conn = void 0;
const mysql = require('mysql2');
const { Client } = require('ssh2');
require('dotenv').config();
const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    connectTimeout: 24000,
    queueLimit: 0,
    stream: null
};
const sshConfig = {
    host: process.env.SSH_TUNNEL_HOST,
    username: process.env.SSH_TUNNEL_USERNAME,
    password: process.env.SSH_TUNNEL_PASSWORD,
    port: process.env.SSH_TUNNEL_PORT
};
const createDBConnection = () => {
    const mysqlConnection = mysql.createPool(config);
    return mysqlConnection;
};
const mysqlInvokeQuery = (sqlQuery, data) => {
    try {
        const ssh = new Client();
        ssh.on('ready', function () {
            console.log('Client :: ready');
            ssh.forwardOut('premium203.web-hosting.com', 8000, '127.0.0.1', 3306, (err, stream) => {
                if (err)
                    throw err;
                config.stream = stream;
                const db = mysql.createPool(config);
                exports.conn = db;
                db.query(sqlQuery, function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }
                    if (results) {
                        data(results);
                    }
                });
            });
        }).connect({
            host: sshConfig.host,
            port: sshConfig.port,
            username: sshConfig.username,
            password: sshConfig.password
        });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
    }
};
exports.mysqlInvokeQuery = mysqlInvokeQuery;
