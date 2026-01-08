
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 5,
        select: false,
    },

    rollNo: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        default: "",
    },

    collegeName: {
        type: String,
        default: '',
    },

    departmentName: {
        type: String,
        default: '',
    },

    bio: {
        type: String,
        default: '',
    },

    listings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
        },
    ],

    savedItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
      }
    ],

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema, "User");