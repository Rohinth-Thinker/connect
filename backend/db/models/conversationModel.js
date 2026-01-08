const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    conversation : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true,
    },

    messages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Message",
        default: [],
    }
}, {timestamps: true})

module.exports = mongoose.model('conversation', conversationSchema, 'conversation');