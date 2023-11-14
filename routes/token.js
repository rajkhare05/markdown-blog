const express = require('express');
const tokenController = require('../controllers/token');

const tokenRoute = express.Router();

// for "/token" route
tokenRoute.post("/", tokenController);

module.exports = tokenRoute;

