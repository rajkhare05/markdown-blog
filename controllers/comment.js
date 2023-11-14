const commentMod = require('../models/comment');
const postMod = require('../models/post');

const createNewComment = async (req, res) => {
    try {
        const { postID, content } = req.body;

        const post = await postMod.findById(postID);
        if (post == null) return res.status(404).json({ message: "Post not found !" });

        const comment = await commentMod.create({ commentedOnPost: post._id, content: content, author: req.user._id });
        await post.updateOne({ $push: [{ comments: comment._id }]});

        return res.json({ message: "Commented!", id: comment._id });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentID } = req.body;
        const comment = await commentMod.findById(commentID);

        if (comment == null)
            return res.status(404).json({ message: "Comment not found !" });
        
        if (!comment.author.equals(req.user._id))
            return res.status(400).json({ message: "You are not an author of this comment !" });

        await comment.delete();

        return res.json({ message: "Comment deleted !" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentID, content } = req.body;
        const comment = await commentMod.findById(commentID);

        if (comment == null)
            return res.status(404).json({ message: "Comment not found !" });

        if (!comment.author.equals(req.user._id))
            return res.status(400).json({ message: "You are not an author of this comment !" });
            
        await comment.updateOne({ content });

        return res.status(201).json({ message: "Comment updated !" });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// get only a single comment using an ID (commentID)
const getComment = async (req, res) => {
    try {
        const { commentID } = req.body;
        const comment = await commentMod.findById(commentID);

        if (comment == null) 
            return res.status(404).json({ message: "Comment not found !" });

        return res.json(comment);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// get all comments of a post using post ID
const getAllCommentsOfPost = async (req, res) => {
    try {
        const { postID } = req.body;
        let comments;

        if (req.query.userid) {
            const userID = req.query.userid;
            comments = await commentMod.find({ commentedOnPost: postID, author: userID });

        } else {
            comments = await commentMod.find({ commentedOnPost: postID });
        }

        if (comments == null)
            return res.status(404).json({ message: "Comments not found !" });
        
        return res.json(comments);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { 
    createNewComment, 
    updateComment, 
    deleteComment, 
    getComment, 
    getAllCommentsOfPost
};

