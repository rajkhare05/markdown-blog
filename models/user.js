const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    username: {
        type: String,
        trim: true,
    },
    mobile: {
        type: String,
        unique: true,
        trim: true,
        // required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'uploads/default.png'
    },
    status: {
        type: String,
        required: true,
    },
    numofposts: {
        type: Number,
        default: 0,
    },
    isOnline: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

const User = mongoose.model("users", userSchema);

module.exports = User;

