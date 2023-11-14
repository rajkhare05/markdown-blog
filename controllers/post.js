const postMod = require('../models/post');
const userMod = require('../models/user');

const getPost = async (req, res) => {
    try {
        const post = req.post;
        const author = await getAuthorByID(post.author);
        return res.json({ post, author });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const createNewPost = async (req, res) => {
    try {
        const userID = req.user._id;
        req.body.author = userID;

        // add a post validator
        const post = await postMod.create(req.body);
        
        await userMod.findByIdAndUpdate(userID, { $inc: { numofposts: 1 }});
        return res.status(201).json({ message: "Published!", id: post._id });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const updatePost = async (req, res) => {
    try {
        if (!req.post.author.equals(req.user._id))
            return res.status(400).json({ message: "You are not an author of this post !" });

        const postID = req.params.id;
        const fields = Object.keys(req.body);
        const updatedFields = {};

        const validKeys = fields.filter((field) => 
            req.body[field] != null      && 
            req.body[field] != undefined && 
            req.body[field].trim() !== ""
        );

        validKeys.forEach(key => updatedFields[key] = req.body[key]);
        
        await postMod.findByIdAndUpdate(postID, { ...updatedFields });
        return res.status(201).json({ message: "Post updated !", id: postID });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const deletePost = async(req, res) => {
    try {
        if (!req.post.author.equals(req.user._id))
            return res.status(400).json({ message: "You are not an author of this post !" });

        const postID = req.params.id; const userID = req.user._id;

        await postMod.findOneAndDelete(postID);
        await userMod.findByIdAndUpdate(userID, { $inc: { numofposts: -1 }});
        
        return res.status(201).json({ message: "Post deleted !" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// temporary ========
const getAuthorByID = async (id) => {
    try {
        const author = await userMod.findById(id).select({ firstName: 1, lastName: 1 });
        return author;
    } catch (err) {
        console.error(err);
        return; 
    }
}

const getAllPosts = async (req, res) => {
    try {
        // const posts = await postMod.find().select({ title: 1, image: 1, author: 1, createdAt: 1 });
        const posts = await postMod.find().select({ title: 1, image: 1, author: 1, createdAt: 1, body: { $substr: ["$body", 0, 160] } });
        const authors = {}; 

        for (const post of posts) {
            const authorID = post.author;
            if (authors[authorID] === undefined) {
                const author = await getAuthorByID(authorID); 
                authors[authorID] = author.firstName + " " + author.lastName;
            }
        }
        return res.json({ posts, authors });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
// ==================

module.exports = { createNewPost, getPost, updatePost, deletePost, getAllPosts };

