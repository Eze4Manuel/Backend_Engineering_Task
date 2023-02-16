"use strict";
// const { MongoClient } = require('mongodb');
// const config = require('./dbclient');
// require('dotenv').config()
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
// // TODO: make password env variable
// async function mongodbConnect() {
//     const uri = process.env.MONGODB_URI;
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
//         // setting global client
//         config.dbClient = client
//         console.log('Connection Successful');
//     } catch (e) {
//         // console.error(e);
//         console.dir(e)
//     }
// }
// module.exports = mongodbConnect;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb://localhost:27017/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
