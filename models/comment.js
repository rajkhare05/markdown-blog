const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    commentedOnPost: { // `postID` where comment posted
        type: mongoose.Types.ObjectId,
        ref: "posts",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    }
}, {
    timestamps: true,
});

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;

