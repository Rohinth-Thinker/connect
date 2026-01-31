
const { isValidObjectId } = require("mongoose");
const itemModel = require("./models/itemModel");
const userModel = require("./models/userModel");
const conversationModel = require("./models/conversationModel");
const messageModel = require("./models/messageModel");

async function findUser(username) {
    try {
        const user = await userModel.findOne({username});
        return user;
    } catch(err) {
        throw err;
    }
}

async function findUserByID(id) {
    try {
        const user = await userModel.findById(id);
        return user;
    } catch(err) {
        throw err;
    }
}

async function createUser(username, password, rollNo) {
    try {
        const user = await userModel.create({username, password, rollNo});
        return user;
    } catch(err) {
        throw err;
    }
}

async function findUserWithPass(username) {
    try {
        const user = await userModel.findOne({username}).select("+password");
        return user;
    } catch(err) {
        throw err;
    }
}

async function fetchItems(query, page, limit) {
    try {
        // const regex = new RegExp(query, "i");
        const filter = query ? {
            $or: [
                {title: {$regex: query, $options: "i"}},
                {description: {$regex: query, $options: "i"}},
                {tags: {$regex: query, $options: "i"}},
            ]
        } : {}

        const skip = (page - 1) * limit;

        const items = await itemModel.find(filter).populate("owner", "username avatar").skip(skip).limit(limit);
        const total = await itemModel.countDocuments({});

        return {items, total, skipped: skip};
    } catch(err) {
        throw err;
    }
}

async function fetchItemById(id) {
    try {
        const item = await itemModel.findById(id).populate("owner", "username avatar rollNo");
        return item;
    } catch(err) {
        throw err;
    }
}

function isValid(id) {
    return isValidObjectId(id);
}

async function addItem(title, price, category, condition, description, images, tags, owner) {
    const item = await itemModel.create({title, price, category, condition, description, images, tags, owner});
    return item;
}

async function addSavedItems(username, id) {
    try {
        const result = await userModel.updateOne({username}, {$addToSet: {savedItems: id}});
        return result;
    } catch(err) {
        throw err;
    }
}

async function removeSavedItems(username, id) {
    try {
        const result = await userModel.updateOne({username}, {$pull: {savedItems: id}});
        return result;
    } catch(err) {
        throw err;
    }
}

async function uploadNewItem(itemData) {
    try {
        const item = await itemModel.create(itemData);
        return item;
    } catch(err) {
        throw err;
    }
}

async function updateEditedProfile(username, profile) {
    try {
        const result = await userModel.updateOne({username}, profile);
        return result;
    } catch(err) {
        throw err;
    }
}

async function getUserProfile(username) {
    try {
        // const user = await userModel.findOne({username}).populate("listings savedItems","title price ");
        const user = await userModel.findOne({username});
        return user;
    } catch(err) {
        throw err;
    }
}

async function testingAddConvo() {
    await conversationModel.create({conversation: ['6953e95875397ccfa4bc02ec', '6954e0849fa2db0099ce34c0']})
}

async function getUserConversations(userID) {
    try {
        const conversations = await conversationModel.find({conversation: {$in: userID}}).select("-messages").populate("conversation").sort({updatedAt: -1});
        return conversations
    } catch(err) {
        throw err;
    }
}

async function getConversation(conversationId) {
    try {
        const conversations = await conversationModel.findById(conversationId).populate("conversation messages");
        return conversations
    } catch(err) {
        throw err;
    }
}

async function getMessagesByConversationID(conversationID, page, limit) {
    try {

        const skip = (page - 1) * limit;
        const messages = await messageModel.find({conversationID}).sort({createdAt: -1}).skip(skip).limit(limit);
        const total = await messageModel.countDocuments({conversationID});

        return {messages, total, skipped: skip};
    } catch(err) {
        throw err;
    }
}

async function createMessage(conversationID, sender, text) {
    try {
        const message = await messageModel.create({conversationID, sender, text});
        return message;
    } catch(err) {
        throw err;
    }
}

async function addMessage(conversationID, messageID) {
    try {
        const response = conversationModel.updateOne({_id: conversationID}, {$push: {messages: messageID}});
        return response;
    } catch(err) {
        throw err;
    }
}

async function getAllUserProfiles() {
    const profiles = await userModel.find().sort({updatedAt: 1});

    // const dates = profiles.map((pro) => [pro.username, new Date(pro.updatedAt).toLocaleDateString('en-GB')]);
    // console.log(dates);

    return profiles;
}

async function getUserProfilesWithPagination(query, page, limit) {
    try {
        const filter = query ? {
            $or: [
                {username: {$regex: query, $options: "i"}},
                {rollNo: {$regex: query, $options: "i"}},
            ]
        } :  {};

        const skip = (page - 1) * limit;

        const [profiles, total] = await Promise.all([
            userModel.find(filter).skip(skip).limit(limit),
            userModel.countDocuments(filter),
        ])

        // const profiles = await userModel.find(filter).skip(skip).limit(limit);
        // const total = await userModel.countDocuments(filter);

        return {profiles, total, skipped: skip};
    } catch(err) {
        throw err;
    }
}

async function checkConversationExist(userID, memberID) {
    try {
        const conversation = await conversationModel.findOne({conversation: {$all: [userID, memberID]}}).select("-messages");
        return conversation;
    } catch(err) {
        throw err;
    }
}

async function createConversation(userID, memberID) {
    try {
        const conversation = await conversationModel.create({conversation: [userID, memberID]});
        return conversation;
    } catch(err) {
        throw err;
    }
}

// async function messageDummy() {
//     messageModel.create({sender: '6954e0849fa2db0099ce34c0', text: 'What about you?'});
// }
// 6969e029eb5a85bfd81247b1 6969e04fb7b2fc9927fb6155 6969e0716ce528ee6167f9c3 6969e07ef721fea3715fb3a2
// messageDummy();

module.exports = { 
    findUser, findUserByID, createUser, findUserWithPass, addItem, fetchItems,
    fetchItemById, isValid, addSavedItems, removeSavedItems, uploadNewItem,
    updateEditedProfile, getUserProfile, testingAddConvo,
    getUserConversations, getConversation, createMessage, addMessage, getMessagesByConversationID,
    getAllUserProfiles, getUserProfilesWithPagination,
    checkConversationExist, createConversation,
 };