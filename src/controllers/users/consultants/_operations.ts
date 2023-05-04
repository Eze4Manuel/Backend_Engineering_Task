import { mysqlInvokeQuery } from "../../../database/dbmysqlConn";

export const getClientDetails = (req: any) => {
    // check mysql DB for user
    let query = `SELECT * FROM dpd_users WHERE email = '${req.email}'`
    mysqlInvokeQuery(query, async (rows: any) => {
        if (rows?.length > 0) return rows[0]
        else return null
    })
}