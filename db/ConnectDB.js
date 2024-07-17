mongoose = require("mongoose");
require("dotenv").config();
const mongoURL = process.env.MONGO_URL;
if(mongoose.connection.readyState == 0)
mongoose.connect(mongoURL, function (err) {
  if (err) console.log(err);
});

global.db = global.db? global.db:mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
