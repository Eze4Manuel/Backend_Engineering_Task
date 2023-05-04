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
const consultants_1 = require("../../../classes/consultants");
const _operations_1 = require("./_operations");
const mock_data_1 = require("../../../config/mock_data");
const mongodb_1 = require("mongodb");
const dbConfig = require('../../../database/dbclient');
exports.createSourceTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleSourceTask = new consultants_1.SingleSourceTask(req.body.project_title, req.body.thematic_area, req.body.years_of_experience, req.body.consultant_designation, req.body.project_details, req.user_id, 'interviewing', []);
        const result = yield dbConfig.dbClient.db(process.env.DATABASE).collection('single_source_task').insertOne(singleSourceTask.getObject());
        if (result.acknowledged) {
            console.log(`New document registered with the following ID: ${result.insertedId}`);
            return res.status(200).json({ data: 'OK', msg: 'Single Source Task created', status: "success" });
        }
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong", status: 'failed' });
    }
});
exports.getAllSingleSourceTaskForClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;
        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('single_source_task').find({ client_id: req.user_id }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = yield fetchedResult.toArray();
        }
        else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') };
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('single_source_task').find({ $and: [{ client_id: req.user_id }, { $or: [{ thematic_area: q },] }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = yield fetchedResult.toArray();
        }
        // performing component checks
        switch (component) {
            case 'count':
                payload = { total: payload.length };
                break;
            default:
                payload;
        }
        if (process.env.NODE_ENVN == 'development') {
            payload = payload.map((task) => {
                return Object.assign(Object.assign({}, task), { client: mock_data_1.client });
            });
        }
        else {
            const rows = (0, _operations_1.getClientDetails)(req);
            payload = payload.map((task) => {
                return Object.assign(Object.assign({}, task), { client: rows });
            });
        }
        if (fetchedResult !== null)
            return res.status(200).json({ data: payload, msg: 'data fetched', status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
});
exports.createTeamSourceProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamHireProject = new consultants_1.TeamHireProject(req.body.values.project_title, req.body.values.thematic_area, req.body.values.client_budget, req.body.values.start_date, req.body.values.project_duration, req.body.values.project_details, req.body.values.consultant_project_location, req.user_id, 'interviewing', req.body.docs);
        const result = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').insertOne(teamHireProject.getObject());
        if (result.acknowledged) {
            console.log(`New document registered with the following ID: ${result.insertedId}`);
            return res.status(200).json({ data: 'OK', msg: 'Team Hire Source', status: "success" });
        }
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
});
exports.getAllTeamSourceProjectForClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;
        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').find({ client_id: req.user_id }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = yield fetchedResult.toArray();
        }
        else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') };
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').find({ $and: [{ client_id: req.user_id }, { $or: [{ thematic_area: q }] }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = yield fetchedResult.toArray();
        }
        // performing component checks
        switch (component) {
            case 'count':
                payload = { total: payload.length };
                break;
            default:
                payload;
        }
        if (process.env.NODE_ENVN == 'development') {
            payload = payload.map((task) => {
                return Object.assign(Object.assign({}, task), { client: mock_data_1.client });
            });
        }
        else {
            const rows = (0, _operations_1.getClientDetails)(req);
            payload = payload.map((task) => {
                return Object.assign(Object.assign({}, task), { client: rows });
            });
        }
        if (fetchedResult !== null)
            return res.status(200).json({ data: payload, msg: 'data fetched', status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
});
exports.getAllContractConsultantForClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;
        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('contract_consultant').find({ client_id: req.user_id }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = yield fetchedResult.toArray();
        }
        else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') };
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('contract_consultant').find({ $and: [{ client_id: req.user_id }, { $or: [{ thematic_area: q }] }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = yield fetchedResult.toArray();
        }
        // performing component checks
        switch (component) {
            case 'count':
                payload = { total: payload.length };
                break;
            default:
                payload;
        }
        if (process.env.NODE_ENVN == 'development') {
            payload = payload.map((task) => {
                return Object.assign(Object.assign({}, task), { client: mock_data_1.client });
            });
        }
        else {
            const rows = (0, _operations_1.getClientDetails)(req);
            payload = payload.map((task) => {
                return Object.assign(Object.assign({}, task), { client: rows });
            });
        }
        if (fetchedResult !== null)
            return res.status(200).json({ data: payload, msg: 'data fetched', status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
});
exports.createContractConsultant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contractConsultant = new consultants_1.ContractConsultant(req.body.project_title, req.body.thematic_area, req.body.years_of_experience, req.body.consultant_designation, req.body.project_location, req.body.project_details, req.body.consultant_duration, req.body.commitment_level, req.body.work_type, req.body.start_date, req.body.client_budget, req.user_id, 'pending', []);
        const result = yield dbConfig.dbClient.db(process.env.DATABASE).collection('contract_consultant').insertOne(contractConsultant.getObject());
        if (result.acknowledged) {
            console.log(`New document registered with the following ID: ${result.insertedId}`);
            return res.status(200).json({ data: 'OK', msg: 'Team Hire Source', status: "success" });
        }
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
});
exports.approveVirtualCall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (req.body.task_type == 'team_source_project') {
        const fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne({ _id: new mongodb_1.ObjectId(req.body.task_id) }, { $set: { "virtual_call.$[meet].status": 'received' } }, {
            arrayFilters: [{ "meet.meeting_id": req.body.meeting_id }]
        });
        console.log(fetchedResult);
        if (fetchedResult.acknowledged > 0) {
            return res.status(200).json({ data: '', msg: '', status: "success" });
        }
    }
});
