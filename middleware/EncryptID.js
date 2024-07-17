const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  if (req.cookies["access-token"]) {
    const authenticationToken = jwt.verify(
      req.cookies["access-token"],
      process.env.TOKEN_KEY
    );
    req.userID = authenticationToken.emailID;
  }
  next();
};
