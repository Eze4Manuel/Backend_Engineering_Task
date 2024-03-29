
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req: any, res: any, next: any) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const isCustomAuth = token.length < 500;
            let decodedData;
            if (token && isCustomAuth) {
                decodedData = jwt.verify(token, process.env.TOKEN_KEYPHRASE);
                req.user_id = decodedData?.id;
                req.email = decodedData?.email;

            } else {
                decodedData = jwt.decode(token);
                req.user_id = decodedData?.id;
                req.email = decodedData?.email;
            }

            console.log(req.email);

            next();
        }
        else {
            return res.status(401).json({ msg: "Unauthorized Access" });
        }
    }
    catch (e) {
        return res.status(401).json({ msg: e });
    }
}