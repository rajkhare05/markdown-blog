const postMod = require('../models/post');

const checkPost = async (req, res, next) => {
    try {
        const postID = req.params.id;
        const post = await postMod.findById(postID);

        if (post == null) {
            return res.status(404).json({ message: "Post not found !" });
        }

        req.post = post;
        next();

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = checkPost;

