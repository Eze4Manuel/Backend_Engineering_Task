"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { createSourceTask, getAllSingleSourceTaskForClient, createTeamSourceProject, getAllTeamSourceProjectForClient, getAllContractConsultantForClient, createContractConsultant, approveVirtualCall } = require('../../controllers/users/consultants/consultants');
const { validateCreateSourceTask, validateTeamSourceProject, validateContractConsultant } = require('../../middleware/consultantValidation');
const { handleFileUpload } = require('../../middleware/fileUploader');
const { auth } = require('../../middleware/auth');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + '-' + Math.round(Math.random() * 100);
        const tempSplit = file.originalname.split('.');
        cb(null, file.fieldname + '-' + newName + `.${tempSplit[tempSplit.length - 1]}`);
    }
});
const upload = multer({
    storage: storage,
    files: 10,
    array: true
});
const router = express_1.default.Router();
function routes() {
    router.post('/create-single-source-task/', auth, validateCreateSourceTask, createSourceTask);
    router.get('/get-all-single-source-task/', auth, getAllSingleSourceTaskForClient);
    router.post('/create-team-source-project/', auth, upload.array('documents'), handleFileUpload, validateTeamSourceProject, createTeamSourceProject);
    router.get('/get-all-team-source-project/', auth, getAllTeamSourceProjectForClient);
    router.get('/get-all-contract-consultant/', auth, getAllContractConsultantForClient);
    router.post('/create-contract-consultant/', auth, validateContractConsultant, createContractConsultant);
    router.post('/approve-virtual-call', auth, approveVirtualCall);
    return router;
}
;
module.exports = routes;
