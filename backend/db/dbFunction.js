
const { isValidObjectId } = require("mongoose");
const itemModel = require("./models/itemModel");
const userModel = require("./models/userModel");
const conversationModel = require("./models/conversationModel");

async function findUser(username) {
    try {
        const user = await userModel.findOne({username});
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

async function fetchItems() {
    try {
        const items = await itemModel.find({}).populate("owner", "username avatar");
        return items;
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

async function getUserConversations(username) {
    try {
        const conversations = await conversationModel.find({conversation: {$in: username}}).select("-messages").populate("conversation");
        return conversations
    } catch(err) {
        throw err;
    }
}

module.exports = { 
    findUser, createUser, findUserWithPass, addItem, fetchItems,
    fetchItemById, isValid, addSavedItems, removeSavedItems, uploadNewItem,
    updateEditedProfile, getUserProfile, testingAddConvo,
    getUserConversations
 };