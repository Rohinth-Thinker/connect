
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

async function connectToDB(dbName) {
    try {
        const db = await mongoose.connect(process.env.DB_URI, {dbName});
        console.log(`Connected to the database '${dbName}'`);
        return db;
    } catch(err) {
        console.log(`Error in connecting to database ${err}`);
        process.exit(1);
    }
}

module.exports = { connectToDB };