"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { MongoClient } = require('mongodb');
const config = require('./dbclient');
require('dotenv').config();
function mongodbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri);
        try {
            yield client.connect();
            // setting global client
            config.dbClient = client;
            console.log('Connection Successful');
        }
        catch (e) {
            console.dir(e);
        }
    });
}
module.exports = mongodbConnect;
