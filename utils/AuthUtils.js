const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
module.exports = (emailID) => {
  return jwt.sign(emailID, process.env.TOKEN_KEY, { expiresIn: "3600s" });
};
