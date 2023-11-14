const express = require('express');
const signinController = require('../controllers/signin');

const signinRoute = express.Router();

// for "/signin" route
signinRoute.post("/", signinController);

module.exports = signinRoute;

