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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile } = require('../utils/s3');
exports.handleFileUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    req.body.docs = [];
    try {
        yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield uploadFile(file);
            yield unlinkFile(file.path);
            req.body.docs.push({ location: result.Location, file_name: result.key });
        })));
        next();
    }
    catch (error) {
        next(error);
    }
});
