const dotenv = require('dotenv');

dotenv.config();

module.exports = { APP_PORT, DB_URI } = process.env;

