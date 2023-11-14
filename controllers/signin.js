const userMod = require('../models/user');
const tokenMod = require('../models/token');
const { createAccessToken, createRefreshToken } = require('../config/token');

const signinController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userMod.findOne({ email: email });
        if (user == null) {
            return res.status(400).json({ message: "User does not exist with this email !" });
        }
        if (password === user.password) {
            const accessToken = createAccessToken(email);
            const refreshToken = createRefreshToken(email);
            await tokenMod.create({ email, accessToken, refreshToken });
            // res.cookie('accessToken', accessToken, { httpOnly: true });
            // res.cookie('refreshToken', refreshToken, { httpOnly: true });
            return res.json({ message: "Sign in successful !", accessToken: accessToken, refreshToken: refreshToken });
            //return res.json({ message: "Sign In Successful! " });
        }

        return res.status(400).json({ message: "Incorrect password !" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong !" });
    }
};

module.exports = signinController;

