const { findUser, getUserConversations } = require("../db/dbFunction");

async function handleGetUserConversations(req, res) {
    try {
        const {username} = req;
        console.log(username);
        const user = await findUser(username);
        if (!user) {
            return res.status(400).json({error: 'Invalid Token'});
        }

        const conversations = await getUserConversations(user._id);
        
        res.status(200).json(conversations);
    } catch(err) {
        console.log(`Error at handleGetUserConversations controller - ${err}`);
        res.status(400).json('Something went wrong. Try again later...');
    }
}

module.exports = {
    handleGetUserConversations,
}