const express = require('express');
const commentController = require('../controllers/comment');
const checkAuth = require('../middlewares/checkAuth');
const checkUser = require('../middlewares/checkUser');

const commentRoute = express.Router();

// "/comment" sub-routes

// "/comment/all"
// get all comments of a post using post ID
commentRoute.get("/", commentController.getAllCommentsOfPost);

// "/comment/new"
// create a new comment
commentRoute.post("/new", checkAuth, checkUser, commentController.createNewComment);

// "/comment/delete"
// delete a comment using an ID
commentRoute.delete("/delete", checkAuth, checkUser, commentController.deleteComment);

// "/comment/update"
// update a comment using an ID
commentRoute.patch("/update", checkAuth, checkUser, commentController.updateComment);

// "/comment/:id"
// get a comment from an ID
commentRoute.get("/:id", commentController.getComment);

module.exports = commentRoute;

