const express = require('express');
const signupController = require('../controllers/signup');

const signupRoute = express.Router();

// for "/registration" route
signupRoute.post("/", signupController);

module.exports = signupRoute;

