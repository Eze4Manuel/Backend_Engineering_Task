const { MongoClient } = require('mongodb');
const config = require('./dbclient');
require('dotenv').config()

async function mongodbConnect() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        // setting global client
        config.dbClient = client
        console.log('Connection Successful');
    } catch (e) {
        console.dir(e)
    }
}
module.exports = mongodbConnect;
