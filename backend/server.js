
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { connectToDB } = require('./db/database');
const router = require('./routes/index');

const app = express();

const PORT = process.env.PORT_NUM;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api', router)

app.listen(PORT, async () => {
    const db = await connectToDB('connect');
    console.log(`Server is listening on port ${PORT}`);
})