const express = require('express')
const signoutController = require('../controllers/signout');

const signoutRoute = express.Router();

// for "/signout" route
signoutRoute.delete("/", signoutController);

module.exports = signoutRoute;

