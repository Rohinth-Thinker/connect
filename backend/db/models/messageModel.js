
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
   conversationID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
   },

   sender: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
   },

    text: {
        type: String,
        required: true,
        trim: true,
    }

}, {timestamps: true})

module.exports = mongoose.model('message', messageSchema, 'message');