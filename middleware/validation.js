module.exports = function () {
  return function (req, res, next) {
    const username = req.body.username.toString();
    const password = req.body.username.toString();
    if (!username || username.length < 6) {
      res.send(400).json({ msg: "User name should be atleast a length of 6" });
      res.send();
    } else if (!password || password.length < 6) {
      res
        .send(400)
        .json({ msg: "Password should be atleast be a lenght of 6" });
      res.send();
    } else next();
  };
};
