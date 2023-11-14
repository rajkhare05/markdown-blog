const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    }
}, {
    timestamps: true 
});

const Token = mongoose.model("tokens", tokenSchema);

module.exports = Token;

