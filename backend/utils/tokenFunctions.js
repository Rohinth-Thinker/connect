const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function generateToken(username, userID) {
    const token = jwt.sign({username, userID}, process.env.TOKEN_SECRET_KEY, {expiresIn: '15d'});
    return token;
}

function verifyToken(token) {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    return decoded;
}

module.exports = { generateToken, verifyToken };