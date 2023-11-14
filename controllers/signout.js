const tokenMod = require('../models/token');

const signoutController = async (req, res) => {
    try {
        const { accessToken } = req.body;
        const token = await tokenMod.deleteOne({ accessToken });
        if (token.deletedCount == 1) return res.json({ message: "Signed out !" });
        return res.json({ message: "Already signed out !" });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong !" });
    }
};

module.exports = signoutController;

