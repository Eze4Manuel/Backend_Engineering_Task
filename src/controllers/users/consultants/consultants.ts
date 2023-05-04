import express, { Request, Response, NextFunction } from 'express';
import { ContractConsultant, SingleSourceTask, TeamHireProject } from '../../../classes/consultants';
import { mysqlInvokeQuery } from '../../../database/dbmysqlConn';
import { getClientDetails } from './_operations';
import { client } from '../../../config/mock_data';
import { ObjectId } from 'mongodb';
const dbConfig = require('../../../database/dbclient');

exports.createSourceTask = async (req: any, res: Response) => {
    try {
        const singleSourceTask: SingleSourceTask = new SingleSourceTask(req.body.project_title, req.body.thematic_area, req.body.years_of_experience, req.body.consultant_designation, req.body.project_details, req.user_id, 'interviewing', []);
        const result = await dbConfig.dbClient.db(process.env.DATABASE).collection('single_source_task').insertOne(singleSourceTask.getObject());
        if (result.acknowledged) {
            console.log(`New document registered with the following ID: ${result.insertedId}`);
            return res.status(200).json({ data: 'OK', msg: 'Single Source Task created', status: "success" });
        }
    } catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong", status: 'failed' });
    }
}

exports.getAllSingleSourceTaskForClient = async (req: any, res: Response) => {
    try {
        let payload: any;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;

        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('single_source_task').find({ client_id: req.user_id }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = await fetchedResult.toArray();
        } else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') }
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('single_source_task').find({ $and: [{ client_id: req.user_id }, { $or: [{ thematic_area: q },] }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = await fetchedResult.toArray();
        }
        // performing component checks
        switch (component) {
            case 'count':
                payload = { total: payload.length };
                break;
            default:
                payload
        }
        if (process.env.NODE_ENVN == 'development') {
            payload = payload.map((task: any) => {
                return {
                    ...task,
                    client: client
                }
            });
        } else {
            const rows = getClientDetails(req);
            payload = payload.map((task: any) => {
                return {
                    ...task,
                    client: rows
                }
            });
        }
        if (fetchedResult !== null) return res.status(200).json({ data: payload, msg: 'data fetched', status: "success" });
    } catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}


exports.createTeamSourceProject = async (req: any, res: Response) => {
    try {
        const teamHireProject: TeamHireProject = new TeamHireProject(req.body.values.project_title, req.body.values.thematic_area, req.body.values.client_budget, req.body.values.start_date, req.body.values.project_duration, req.body.values.project_details, req.body.values.consultant_project_location, req.user_id, 'interviewing', req.body.docs);
        const result = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').insertOne(teamHireProject.getObject());
        if (result.acknowledged) {
            console.log(`New document registered with the following ID: ${result.insertedId}`);
            return res.status(200).json({ data: 'OK', msg: 'Team Hire Source', status: "success" });
        }
    } catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}


exports.getAllTeamSourceProjectForClient = async (req: any, res: Response) => {
    try {
        let payload: any;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;

        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').find({ client_id: req.user_id }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = await fetchedResult.toArray();
        } else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') }
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').find({ $and: [{ client_id: req.user_id }, { $or: [{ thematic_area: q }] }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = await fetchedResult.toArray();
        }
        // performing component checks
        switch (component) {
            case 'count':
                payload = { total: payload.length };
                break;
            default:
                payload
        }
        if (process.env.NODE_ENVN == 'development') {
            payload = payload.map((task: any) => {
                return {
                    ...task,
                    client: client
                }
            });
        } else {
            const rows = getClientDetails(req);
            payload = payload.map((task: any) => {
                return {
                    ...task,
                    client: rows
                }
            });
        }
        if (fetchedResult !== null) return res.status(200).json({ data: payload, msg: 'data fetched', status: "success" });
    } catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}



exports.getAllContractConsultantForClient = async (req: any, res: Response) => {
    try {
        let payload: any;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;

        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('contract_consultant').find({ client_id: req.user_id }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = await fetchedResult.toArray();
        } else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') }
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('contract_consultant').find({ $and: [{ client_id: req.user_id }, { $or: [{ thematic_area: q }] }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = await fetchedResult.toArray();
        }
        // performing component checks
        switch (component) {
            case 'count':
                payload = { total: payload.length };
                break;
            default:
                payload
        }
        if (process.env.NODE_ENVN == 'development') {
            payload = payload.map((task: any) => {
                return {
                    ...task,
                    client: client
                }
            });
        } else {
            const rows = getClientDetails(req);
            payload = payload.map((task: any) => {
                return {
                    ...task,
                    client: rows
                }
            });
        }
        if (fetchedResult !== null) return res.status(200).json({ data: payload, msg: 'data fetched', status: "success" });
    } catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}

exports.createContractConsultant = async (req: any, res: Response) => {
    try {
        const contractConsultant: ContractConsultant = new ContractConsultant(req.body.project_title, req.body.thematic_area, req.body.years_of_experience, req.body.consultant_designation, req.body.project_location, req.body.project_details, req.body.consultant_duration, req.body.commitment_level, req.body.work_type, req.body.start_date, req.body.client_budget, req.user_id, 'pending', []);
        const result = await dbConfig.dbClient.db(process.env.DATABASE).collection('contract_consultant').insertOne(contractConsultant.getObject());
        if (result.acknowledged) {
            console.log(`New document registered with the following ID: ${result.insertedId}`);
            return res.status(200).json({ data: 'OK', msg: 'Team Hire Source', status: "success" });
        }
    } catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}


exports.approveVirtualCall = async (req: any, res: Response) => {
    console.log(req.body);

    if (req.body.task_type == 'team_source_project') {
        const fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne(
            { _id: new ObjectId(req.body.task_id) },
            { $set: { "virtual_call.$[meet].status": 'received' } },
            {
                arrayFilters: [{ "meet.meeting_id": req.body.meeting_id }]
            })
        console.log(fetchedResult);
        if (fetchedResult.acknowledged > 0) {
            return res.status(200).json({ data: '', msg: '', status: "success" });
        }
    }
}

