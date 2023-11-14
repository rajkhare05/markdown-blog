const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "secret";

const createAccessToken = (email) => {
    const token = jwt.sign({ email: email }, ACCESS_TOKEN_SECRET, { algorithm: "HS256", expiresIn: "10m" });
    return token;
}

const createRefreshToken = (email) => {
    const token = jwt.sign({ email: email }, REFRESH_TOKEN_SECRET, { algorithm: "HS256" });
    return token;
}

module.exports = { createAccessToken, createRefreshToken };

