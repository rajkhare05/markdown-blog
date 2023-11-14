const tokenMod = require('../models/token');
const jwt = require('jsonwebtoken');
const { createAccessToken } = require('../config/token');

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const tokenController = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (refreshToken == null || refreshToken == undefined) {
            return res.status(401).json({ message: "Refresh token required !" });
        }

        const token = await tokenMod.findOne({ refreshToken });
        
        if (token == null) {
            return res.status(403).json({ message: "Sign in first !" });
        }

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Something went wrong !" });
            const accessToken = createAccessToken(user.email);
            // res.cookie('accessToken', accessToken, { httpOnly: true });
            return res.status(201).json({ accessToken });
            // return res.json({ message: 'OK' });
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong !" });
    }

};

module.exports =  tokenController;

