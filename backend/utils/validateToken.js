const { findUser } = require("../db/dbFunction");
const { verifyToken } = require("./tokenFunctions");

async function validateToken(req, res, next) {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({error: 'Token is not provided'});
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({error: 'Invalid token'});
    }

    // const user = await findUser(decoded.username);
    // if (!user) {
    //     return res.status(401).json({error: 'Invalid token'});
    // }

    req.username = decoded.username;
    req.userID = decoded.userID;
    next();
}

module.exports = {validateToken};