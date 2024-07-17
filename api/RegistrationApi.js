const bcrypt = require("bcrypt");
const User = require("../db/schema/Users");
const dotenv = require("dotenv");
const router = require("express").Router();
const generateAccessToken = require("../utils/AuthUtils");
// get config vars
dotenv.config();

router.get("/register", (req, res) => {
  res.render("registrationform.ejs");
});
router.get("/login", (req, res) => {
  res.render("loginPage.ejs");
});
router.post("/register", async (req, res) => {
  try {
    var currentuser = await User.findOne({ Email: req.body.email });
    //jwt token

    if (!currentuser) {
      let Password = req.body.password;
      let hashPassword = undefined;
      const saltRounds = 10;
      // hashing
      bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
          return bcrypt.hash(Password, salt);
        })
        .then((hash) => {
          // Store hash in your password DB.
          hashPassword = hash;

          const newUser = new User({
            UserID: mongoose.Types.ObjectId(),
            Username: req.body.username,
            Email: req.body.email.toLowerCase(),
            PhoneNo: req.body.phoneNo,
            PasswordHash: hashPassword,
            token: generateAccessToken({
              emailID: req.body.email.toLowerCase(),
            }),
          });

          // save user token
          newUser.save((error, result) => {
            if (error) {
              console.log(error);
              res.send({message:'error'})
            } else {

            }
          });

          res.send({message:"Registration successful"});
        })
        .catch((err) => console.error(err.message));
    } else {
     res.send({message:"User already exists"})
    }
  } catch (err) {
    res.send({message:"Internal Server Error. Try again!"});
  }
});

router.post("/login", async (req, res) => {
console.log(req);
  try {
    var foundUser = await User.findOne({ Email: req.body.email.toLowerCase() });

    if (foundUser) {
      let submittedPassword = req.body.password;
      let storedPass = foundUser.PasswordHash;

      const passwordMatch = await bcrypt.compare(submittedPassword, storedPass);
      if (passwordMatch) {
        let usrname = foundUser.Username;
        foundUser.token = generateAccessToken({ emailID: foundUser.Email });
        res.cookie("access-token", foundUser.token, {
          maxAge: 60 * 1000 * 60*5,
          httpOnly: false,
        });
        res.status(200).send({message:'success'});
      } else {
        res.status(401).send({message:'Invalid Username or Password'})
      }
    } else {
     
    }
  } catch (err) {
    res.send("Internal server error: " + err);
    return;
    res.status(401).send({message:'User Not Registered'})
  }
});



module.exports = router;
