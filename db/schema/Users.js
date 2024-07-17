// import mongoose, { mongo } from 'mongoose'
const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ID",
    },
    Username: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "username",
    },
    Email: {
      type: mongoose.Schema.Types.String,
      ref: "email",
      required: true,
      unique: true,
    },
    PasswordHash: {
      type: mongoose.Schema.Types.String,
      ref: "hash",
      required: true,
    },
    PhoneNo: {
      type: mongoose.Schema.Types.String,
      ref: "phoneNo",
      required: true,
    },
    privileges: {
      type: mongoose.Schema.Types.String,
      enum: ["ADMIN", "USER", "VOLUNTEER"],
    },
  },
  { timestamps: true }
);

var User = mongoose.model("Reguser", UserSchema);
module.exports = User;
