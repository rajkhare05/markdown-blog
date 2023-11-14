const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    likeCounts: {
        type: Number,
        default: 0,
    },
    shareCounts: {
        type: Number,
        default: 0,
    },
    comments: {
        type: [mongoose.Types.ObjectId],
        ref: "comments",
        default: []
    }
}, {
    timestamps: true
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;

