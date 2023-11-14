const userMod = require('../models/user');

const signupController = async (req, res) => {
    try {
        const { email, mobile } = req.body;
        const user = await userMod.findOne({ $or: [{ email: email }, { mobile: mobile }]});

        if (user) {
            if (email === user.email && mobile === user.mobile) {
                return res.status(400).json({ message: "Email and mobile already in use !" });

            } else if (email === user.email) {
                return res.status(400).json({ message: "Email already in use !" });

            } else {
                return res.status(400).json({ message: "Mobile already in use !" });
            }
        }

        req.body.avatar = (req.file && req.file.path) || req.body.avatar;
        
        const createdUser = await userMod.create(req.body);
        return res.json({ message: "Registered !", id: createdUser.id });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong !" });
    }
}

module.exports = signupController;

