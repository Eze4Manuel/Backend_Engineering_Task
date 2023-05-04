import express, { Response } from 'express';
import { ObjectId } from "mongodb";
import { mysqlInvokeQuery } from '../../database/dbmysqlConn';
import { extractUserDetails } from '../../utils/functionHelpers';
import { userData } from '../../config/mock_data';
const config = require('../../database/dbclient');




exports.getAdmin = async (req: any, res: Response) => {
    try {
        if (process.env.NODE_ENVN == 'development') return res.status(200)
            .json({
                data: userData,
                msg: "User Details Fetched",
                status: 'success'
            });

        // check mysql DB for user
        let query = `SELECT * FROM dpd_users WHERE email = '${req.email}'`
        mysqlInvokeQuery(query, async (rows: any) => {
            if (rows?.length > 0) {
                const _result = await extractUserDetails(rows[0]);
                console.log(_result);

                return res.status(200)
                    .json({
                        data: { ..._result },
                        msg: "User Details Fetched",
                        status: 'success'
                    });
            }
            else return res.status(400)
                .json({
                    msg: "Account not found.",
                    status: 'failed'
                });
        });
    } catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }

}