const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  secret: process.env.JWT_SECRET_KEY,
  cookieSecret: process.env.COOKIE_SECRET_KEY,
};
