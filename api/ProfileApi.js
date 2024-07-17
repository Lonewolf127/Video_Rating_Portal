const router = require("express").Router();
const encryptID = require("../middleware/EncryptID");
const authenticate = require("../middleware/Authenticate");
const User = require("../db/schema/Users");
const bcrypt = require("bcrypt");
const { update } = require("../db/schema/Users");
const VideoUtils = require("../utils/VideoUtils");

//GET
router.get("/profile", encryptID,authenticate, async (req, res) => {
  const UserVideos = await db
    .collection("videos")
    .aggregate([
      { $match: { uploadedBy: { $eq: req.userID } } },
      { $sample: { size: 15 } },
    ])
    .toArray();
  UserVideos.forEach((element) => {
    element.documentRef = "/view/" + element.documentRef;
  });

  User.find({ Email: req.userID }, (err, docs) => {
    if (err || docs[0] === undefined) {
      res.sendStatus(500);
    } else {
      res.render("profile.ejs", { user: docs[0], UserVideos: UserVideos });
    }
  });
});

//POST
router.post("/profile", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const phoneNo = req.body.phoneNo;
  const password = req.body.password;
  let updateJSON = { Username: username, PhoneNo: phoneNo };

  //if password was modified, hash the password before updating the db
  if (password != "") {
    const saltRounds = 10;
    // hashing
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .then((hash) => {
        updateJSON.PasswordHash = hash;

        User.findOneAndUpdate(
          { Email: email },
          { $set: updateJSON },
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              res.send("Update Done Successfully");
            }
          }
        );
      });
  } else {
    User.findOneAndUpdate(
      { Email: email },
      { $set: updateJSON },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send("Update Done Successfully");
        }
      }
    );
  }
});


module.exports=router;
