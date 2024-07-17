const express = require("express");
const req = require("express/lib/request");
const app = express();
const cors = require("cors");
//const multer = require('multer')();
const CookieParser = require("cookie-parser");
app.use(CookieParser());
app.use(express.static("/views"));
app.use(express.static(__dirname + "/public"));
require("dotenv").config();
require("./db/ConnectDB")
const authRouter = require("./api/RegistrationApi");
const videoRouter = require("./api/VideoApi");
const profileRouter = require("./api/ProfileApi");
const authenticateToken = require("./middleware/Authenticate");
const ratingsRouter = require("./api/RatingApi");
const upload = require("./middleware/StorageHandler");


app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
//app.use(multer.array())
app.use(authRouter);
app.use(videoRouter);
app.use(profileRouter);
app.use(ratingsRouter);
app.set("view engine", "ejs");
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is up and running on port %d", port);
});
app.post("/ratings", async (req, res) => {
  ratingapi(req, res);
});
// app.get('/ratings',async(req,res)=>{
//      ratingapi(req,res);
//     console.log(req);
//  });
app.get("/welcome", (req, res) => {
  res.send("Welcome");
});
