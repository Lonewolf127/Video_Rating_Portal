const mongoose = require("mongoose");
const Rating = require('./Ratings');

const videoSchema = new mongoose.Schema({
  uploadedBy: {
    type: String,
    ref: "User",
    required: true,
  },
  Ratings: [Rating.schema],
  thumbnail: { type: String },
  tags: [{ type: String }],
  documentRef: {
    type: String,
  },
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
