const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const rawToken = req.headers.authorization;
    const token = rawToken && rawToken.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ message: "Sign in first !" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { 
            return res.status(401).json({ message: "Auth token expired !" });
        }
        req.user = user;
        next();
    });
}

module.exports = checkAuth;

