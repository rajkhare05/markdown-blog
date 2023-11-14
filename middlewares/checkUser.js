const userMod = require('../models/user.js');

const checkUser = async (req, res, next) => {
    try {
        const user =  await userMod.findOne({ email: req.user.email });
        if (user == null) {
            return res.status(404).json({ message: "User not found !" });
        }

        req.user = { _id: user._id, email: user.email };
        next();

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = checkUser;

