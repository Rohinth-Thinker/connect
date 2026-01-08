const { findUser, createUser, findUserWithPass, testingAddConvo } = require("../db/dbFunction");
const { setCookie } = require("../utils/setCookie");
const { generateToken } = require("../utils/tokenFunctions");
const { validateInputs } = require("../utils/validateInputs");

function healthCheck(req, res) {
    // testingAddConvo();
    res.json({status: true});
}

async function handleSignup(req, res) {
    try {
        let {username,  password, rollNo} = req.body;
        username = username.toLowerCase();

        const validationStatus = validateInputs(req.body);
        if (!validationStatus.status) {
            return res.status(validationStatus.statusCode).json({error: validationStatus.error});
        }

        const user = await findUser(username);
        if (user) {
            return res.status(409).json({error: 'Username aldready exist'});
        }

        const newUser = await createUser(username, password, rollNo);

        const token = generateToken(username);
        setCookie(res, token);

        res.status(200).json({msg: 'Signed up successfully', userID: newUser._id});

    } catch(err) {
        console.log(`Error at handleSignup Controller - ${err}`);
        res.status(400).json({error: 'Something went wrong. Try again later.'});
    }
}

async function handleLogin(req, res) {
    try {
        let {username,  password} = req.body;
        username = username.toLowerCase();

        const validationStatus = validateInputs(req.body);
        if (!validationStatus.status) {
            return res.status(validationStatus.statusCode).json({error: validationStatus.error});
        }

        const user = await findUserWithPass(username);
        if (!user) {
            return res.status(401).json({error: 'User not found'});
        }

        if (user.password !== password) {
            return res.status(401).json({error: 'Invalid password'});
        }

        const token = generateToken(username);
        setCookie(res, token);

        res.status(200).json({msg: 'Logged in successfully', userID: user._id});

    } catch(err) {
        console.log(`Error at handleLogin Controller - ${err}`);
        res.status(400).json({error: 'Something went wrong. Try again later.'});
    }
}

async function handleLogout(req, res) {
    try {
        setCookie(res, "", 0);
        res.status(200).json({msg: 'Logged out successfully'});
    } catch(err) {
        console.log(`Error at handleLogout controller - ${err}`);
        res.status(400).json({error : 'Something went wrong. Try again later.'});
    }
}

module.exports = { healthCheck, handleSignup, handleLogin, handleLogout };