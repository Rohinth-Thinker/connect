const { findUser, getUserConversations, getConversation, isValid, findUserByID, createMessage, addMessage, checkConversationExist, createConversation, getMessagesByConversationID } = require("../db/dbFunction");
const { io } = require("../socket/socket");

async function handleGetUserConversations(req, res) {
    try {
        const {username} = req;
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

async function handleGetConversationWithMessages(req, res) {
    try {
        const {username} = req;
        const {id} = req.params;

        const {page="1", limit="10"} = req.query;

        const user = await findUser(username);
        if (!user) {
            return res.status(400).json({error: 'Invalid Token'});
        }

        if (!id || !isValid(id)) {
            return res.status(400).json({error: 'Invalid Id'});
        }

        const conversation = await getConversation(id);
        if (!conversation) {
            return res.status(400).json({error: 'No conversation found'});
        }

        const {messages, total, skipped} = await getMessagesByConversationID(conversation._id, Number(page), Number(limit));
        const hasMore = skipped + messages.length < total;
        
        res.status(200).json({conversation, messages, hasMore});
    } catch(err) {
        console.log(`Error at handleGetMessagesns controller - ${err}`);
        res.status(400).json('Something went wrong. Try again later...');
    }
}

async function handleAddMessage(req, res) {
    try {
        const {userID} = req;
        const {conversationID, messageText} = req.body;

        if (!userID || !isValid(userID)) {
            return res.status(400).json({error: 'Invalid Token'});
        }

        const user = await findUserByID(userID);
        if (!user) {
            return res.status(400).json({error: 'Invalid Token'});
        }

        if (!conversationID || !isValid(conversationID)) {
            return res.status(400).json({error: 'Invalid Conversation ID'});
        }

        if (!messageText || !messageText.trim()) {
            return res.status(400).json({error: 'Invalid message input'});
        }

        const message = await createMessage(conversationID, user._id, messageText);
        if (!message) {
            res.status(400).json({error: 'Something happened while creating message'});
        }

        const response = await addMessage(conversationID, message._id);
        if (!response.modifiedCount) {
            res.status(400).json({error: 'Something happened while adding message'});
        }

        io.to(conversationID).emit('newMessage', message);

        res.status(200).json(message);
    } catch(err) {
        console.log(`Error at handleAddMessage controller - ${err}`);
        res.status(400).json('Something went wrong. Try again later...');
    }
}

async function handleCheckConversation(req, res) {
    try {

        const {userID} = req;

        const {memberID} = req.params;

        if (!userID || !isValid(userID)) {
            return res.status(400).json({error: 'Invalid Token'});
        }

        const user = await findUserByID(userID);
        if (!user) {
            return res.status(400).json({error: 'Invalid Token'});
        }

        // have to check, recieverID present in user collection, right??
        if (!memberID || !isValid(memberID)) {
            return res.status(400).json({error: 'Invalid recieverID'});
        }

        let convo = await checkConversationExist(userID, memberID);
        if (convo) {
            console.log(convo._id);
            return res.status(200).json({conversationID: convo._id});
        }

        convo = await createConversation(userID, memberID);
        if (!convo) {
            return res.status(400).json({error: 'Unable to create new conversation'});
        }

        res.status(200).json({conversationID: convo._id});
    } catch(err) {
        console.log(`Error at handleCheckConversation controller - ${err}`);
        res.status(400).json('Something went wrong. Try again later...');
    }
}

module.exports = {
    handleGetUserConversations, handleGetConversationWithMessages,
    handleAddMessage, handleCheckConversation,
}