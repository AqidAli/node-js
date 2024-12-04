
const { MongoClient } = require('mongodb');

const dburl = 'mongodb://localhost:27017';
const database = 'School';

let client;
let dbInstance;

async function dbConnection() {
    if (!client || !client.isConnected) {
        try {
            client = new MongoClient(dburl, { useUnifiedTopology: false });
            await client.connect();
            dbInstance = client.db(database);
            console.log("Connected to MongoDB");
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
            throw err; // Ensure you handle this in the calling code
        }
    }
    return dbInstance;
}

module.exports = { dbConnection };
