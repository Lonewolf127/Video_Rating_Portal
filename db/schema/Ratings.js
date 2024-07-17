mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    videoID: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "Video",
    },

    Rating: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref:"Ratings",
    },
    RatedBy: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", Schema);
module.exports = Rating;
