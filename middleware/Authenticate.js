const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const accesstoken = req.cookies["access-token"];

  if (!accesstoken) {
    return res.redirect("/login");
  } else {
    jwt.verify(accesstoken, process.env.TOKEN_KEY, (err) => {
      if (err) return res.sendStatus(401).send("Error: " + err);

      req.authentication = true;

      next();
    });
  }
};
module.exports = authenticateToken;
