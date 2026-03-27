
const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { connectToDB } = require('./db/database');
const router = require('./routes/index');

const { app, server } = require('./socket/socket');

const dns = require("node:dns/promises");
// console.log(dns.getServers());
dns.setServers(["1.1.1.1"]);

// const app = express();

const PORT = process.env.PORT_NUM;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../static')))

app.use('/api', router);

app.get('/', (req, res) => {
    console.log(path.join(__dirname, '../static/index.html'));
    res.status(200).json({ msg: "HEY, is it working..??" });
})

app.get("/*splat", (req, res) => {
    console.log('going');
    console.log(path.join(__dirname, '../static'));
    res.sendFile(path.join(__dirname, '/../static/index.html'));
})

server.listen(PORT, async () => {
    const db = await connectToDB('connect');
    console.log(`Server is listening on port ${PORT}`);
})