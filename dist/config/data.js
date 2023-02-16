"use strict";
require('dotenv').config();
module.exports = {
    sshTunnelConfig: {
        username: process.env.SSH_TUNNEL_USERNAME,
        password: process.env.SSH_TUNNEL_PASSWORD,
        host: process.env.SSH_TUNNEL_HOST,
        port: process.env.SSH_TUNNEL_PORT
    },
    mySQLConfig: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
        connectTimeout: 20000,
        localAddress: '127.0.0.1'
    }
};
