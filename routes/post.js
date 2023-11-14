const express = require('express');
const postController = require('../controllers/post');
const checkAuth = require('../middlewares/checkAuth');
const checkUser = require('../middlewares/checkUser');
const checkPost = require('../middlewares/checkPost');

const postRoute = express.Router();

// temporary ===
postRoute.get("/", postController.getAllPosts);
// =============

// "/post/:id" routes
postRoute.route("/:id")
    .get(checkPost, postController.getPost)
    .patch(checkAuth, checkUser, checkPost, postController.updatePost)
    .delete(checkAuth, checkUser, checkPost, postController.deletePost);

// for "/post/new" route
postRoute.post("/new", checkAuth, checkUser, postController.createNewPost);

module.exports = postRoute;

