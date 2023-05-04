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
const _operations_1 = require("../../users/consultants/_operations");
const mock_data_1 = require("../../../config/mock_data");
const mongodb_1 = require("mongodb");
const consultants_1 = require("../../../classes/consultants");
const _operation_1 = require("./_operation");
const dbConfig = require('../../../database/dbclient');
exports.getAllContractConsultant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;
        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('contract_consultant').find().limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = yield fetchedResult.toArray();
        }
        else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') };
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('contract_consultant').find({ $or: [{ thematic_area: q }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
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
exports.getAllTeamSourceProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;
        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').find().limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = yield fetchedResult.toArray();
        }
        else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') };
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').find({ $or: [{ thematic_area: q }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
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
exports.getAllSingleSourceTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;
        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('single_source_task').find().limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = yield fetchedResult.toArray();
        }
        else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') };
            fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('single_source_task').find({ $or: [{ thematic_area: q }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
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
exports.scheduleVirtualCall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.task_type == 'team_source_project') {
        const fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').findOne({ _id: new mongodb_1.ObjectId(req.body.task_id) });
        console.log(req.body);
        //send mail
        yield (0, _operation_1.sendScheduleEmail)(req.body.client_email, req.body.meeting_link, fetchedResult.project_title);
        // update DB
        const virtual_call = new consultants_1.VirtualCall(new mongodb_1.ObjectId().toString(), req.body.meeting_link, req.body.title, 'pending');
        const updateResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne({
            _id: new mongodb_1.ObjectId(req.body.task_id)
        }, {
            $push: { virtual_call: virtual_call.getObject() }
        });
        if (updateResult.modifiedCount > 0) {
            return res.status(200).json({ data: virtual_call.getObject(), msg: 'mail sent', status: "success" });
        }
    }
});
exports.removeVirtualCall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.task_type == 'team_source_project') {
        const fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne({ _id: new mongodb_1.ObjectId(req.body.task_id) }, {
            $pull: { "virtual_call": { meeting_id: req.body.meeting_id } }
        });
        if (fetchedResult.modifiedCount > 0) {
            return res.status(200).json({ data: '', msg: 'Meeting Removed sent', status: "success" });
        }
    }
});
exports.stopVirtualCall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.task_type == 'team_source_project') {
        const fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne({ _id: new mongodb_1.ObjectId(req.body.task_id) }, {
            $set: { "status": 'stopped' }
        });
        if (fetchedResult.modifiedCount > 0) {
            return res.status(200).json({ data: '', msg: 'Recruitement stopped', status: "success" });
        }
    }
});
exports.addClientToPool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (req.body.task_type == 'team_source_project') {
        const fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').findOne({ _id: new mongodb_1.ObjectId(req.body.task_id) });
        const result = yield dbConfig.dbClient.db(process.env.DATABASE).collection('pool').insertOne({ email: req.body.client_email, client_id: fetchedResult.client_id, task_type: 'team_source_project', task_id: req.body.task_id });
        if (result.acknowledged) {
            const fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne({ _id: new mongodb_1.ObjectId(req.body.task_id) }, {
                $set: { "pool_status": true }
            });
            return res.status(200).json({ data: '', msg: 'Client Added to pool', status: "success" });
        }
    }
});
exports.sendEmailTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (req.body.task_type == 'team_source_project') {
        yield (0, _operation_1.sendEmailTask)(req.body.email, req.body.subject, req.body.message);
        const fetchedResult = yield dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').findOne({ _id: new mongodb_1.ObjectId(req.body.task_id) });
        // update DB
        const email_message = new consultants_1.VirtualCall(new mongodb_1.ObjectId().toString(), req.body.meeting_link, req.body.title, 'pending');
        // const result = await dbConfig.dbClient.db(process.env.DATABASE).collection('pool').insertOne({ email: req.body.client_email, client_id: fetchedResult.client_id, task_type: 'team_source_project', task_id: req.body.task_id })
        // if (result.acknowledged) {
        //     const fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne(
        //         { _id: new ObjectId(req.body.task_id) },
        //         {
        //             $set: { "pool_status": true }
        //         })
        //     return res.status(200).json({ data: '', msg: 'Client Added to pool', status: "success" });
        // }
    }
});
