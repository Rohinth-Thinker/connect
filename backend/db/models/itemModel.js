
const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },
    
    price: {
        type: Number,
        required: true,
        min: 0,
    },

    category: {
        type: String,
        required: true,
        enum: ["Book", "Notes", "Question paper", "Others"],
    },

    condition: {
        type: String,
        required: true,
        enum: ["New", "Like New", "Used", "Heavily Used", "Damaged"],
    },

     description: {
      type: String,
      trim: true,
    },

    images: [
        {
            type: String,
        }
    ],

    tags: [
      {
        type: String,
        // lowercase: true,
        trim: true,
      }
    ],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    views: {
        type: Number,
        default: 0,
    },

    isSold: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true })

module.exports = mongoose.model("Item", itemSchema, "Item");