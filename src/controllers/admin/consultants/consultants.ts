import { getClientDetails } from "../../users/consultants/_operations";
import express, { Request, Response, NextFunction } from 'express';
import { mysqlInvokeQuery } from '../../../database/dbmysqlConn';
import { client } from "../../../config/mock_data";
import { ObjectId } from "mongodb";
import { EmailMessage, VirtualCall } from "../../../classes/consultants";
import { sendEmailTask, sendScheduleEmail } from "./_operation";
import { log } from "console";
const dbConfig = require('../../../database/dbclient');




exports.getAllContractConsultant = async (req: any, res: Response) => {
    try {
        let payload: any;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;

        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('contract_consultant').find().limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = await fetchedResult.toArray();
        } else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') }
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('contract_consultant').find({ $or: [{ thematic_area: q }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
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




exports.getAllTeamSourceProject = async (req: any, res: Response) => {
    try {
        let payload: any;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;

        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').find().limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = await fetchedResult.toArray();
        } else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') }
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').find({ $or: [{ thematic_area: q }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
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




exports.getAllSingleSourceTask = async (req: any, res: Response) => {
    try {
        let payload: any;
        let fetchedResult;
        // catching query params
        let { page = 1, item_per_page = 50, q = '', component = '' } = req.query;

        // checking if query search string was associated
        if (q.length == 0) {
            // get all staff from db
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('single_source_task').find().limit(item_per_page * 1).skip((page - 1) * item_per_page);
            payload = await fetchedResult.toArray();
        } else if (q.length > 2) {
            q = { $regex: new RegExp(`${q}`, 'i') }
            fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('single_source_task').find({ $or: [{ thematic_area: q }] }).limit(item_per_page * 1).skip((page - 1) * item_per_page);
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


exports.scheduleVirtualCall = async (req: any, res: Response) => {

    if (req.body.task_type == 'team_source_project') {
        const fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').findOne({ _id: new ObjectId(req.body.task_id) })
        console.log(req.body);

        //send mail
        await sendScheduleEmail(req.body.client_email, req.body.meeting_link, fetchedResult.project_title)

        // update DB
        const virtual_call = new VirtualCall(new ObjectId().toString(), req.body.meeting_link, req.body.title, 'pending')

        const updateResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne({
            _id: new ObjectId(req.body.task_id)
        }, {
            $push: { virtual_call: virtual_call.getObject() }
        })
        if (updateResult.modifiedCount > 0) {
            return res.status(200).json({ data: virtual_call.getObject(), msg: 'mail sent', status: "success" });
        }
    }
}

exports.removeVirtualCall = async (req: any, res: Response) => {
    if (req.body.task_type == 'team_source_project') {

        const fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne(
            { _id: new ObjectId(req.body.task_id) },
            {
                $pull: { "virtual_call": { meeting_id: req.body.meeting_id } }
            })

        if (fetchedResult.modifiedCount > 0) {
            return res.status(200).json({ data: '', msg: 'Meeting Removed sent', status: "success" });
        }
    }
}


exports.stopVirtualCall = async (req: any, res: Response) => {
    if (req.body.task_type == 'team_source_project') {
        const fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne(
            { _id: new ObjectId(req.body.task_id) },
            {
                $set: { "status": 'stopped' }
            })
        if (fetchedResult.modifiedCount > 0) {
            return res.status(200).json({ data: '', msg: 'Recruitement stopped', status: "success" });
        }
    }
}

exports.addClientToPool = async (req: any, res: Response) => {
    console.log(req.body);

    if (req.body.task_type == 'team_source_project') {
        const fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').findOne(
            { _id: new ObjectId(req.body.task_id) })


        const result = await dbConfig.dbClient.db(process.env.DATABASE).collection('pool').insertOne({ email: req.body.client_email, client_id: fetchedResult.client_id, task_type: 'team_source_project', task_id: req.body.task_id })
        if (result.acknowledged) {
            const fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne(
                { _id: new ObjectId(req.body.task_id) },
                {
                    $set: { "pool_status": true }
                })
            return res.status(200).json({ data: '', msg: 'Client Added to pool', status: "success" });
        }
    }
}

exports.sendEmailTask = async (req: any, res: Response) => {
    console.log(req.body);

    if (req.body.task_type == 'team_source_project') {

        await sendEmailTask(req.body.email, req.body.subject, req.body.message)

        // const fetchedResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').findOne(
        //     { _id: new ObjectId(req.body.task_id) })

        // update DB
        const email_message = new EmailMessage(new ObjectId().toString(), req.body.subject, req.body.message, req.body.email, 'pending')

        const updateResult = await dbConfig.dbClient.db(process.env.DATABASE).collection('team_source_project').updateOne({
            _id: new ObjectId(req.body.task_id)
        }, {
            $push: { email_message: email_message.getObject() }
        })
        if (updateResult.modifiedCount > 0) {
            return res.status(200).json({ data: email_message.getObject(), msg: 'mail sent', status: "success" });
        }
    }
}


