const videoRouter = require("express").Router();
videoRouter.use(require("express").static("./public"));
const mongoose = require("mongoose");
const Video = require("../db/schema/Videos");
const { generateVideoDownloadHeader } = require("../utils/VideoUtils");
const upload = require("../middleware/StorageHandler");
const authenticateToken = require("../middleware/Authenticate");
const EncryptID = require("../middleware/EncryptID");
const { GridFsStorage } = require("multer-gridfs-storage");
const {GridFSBucketOptions} = require('mongodb');
const { GridFSBucket } = require("mongoose/node_modules/mongodb");
videoRouter.use(require("express").static("public"));
const qrr=require("../constants.js").questions_arr;

//upload a new video
videoRouter.post(
  "/video/upload",
  authenticateToken,
  EncryptID,
  upload,
  (req, res) => {
    //upload has been completed;
    const newVideo = new Video({
      uploadedBy: req.userID,
      documentRef: req.file.id,
      thumbnail: req.body.thumbnail,
    });
    newVideo.save((err, result) => {
      if (err) console.log(err);
    });
    db.collection("regusers")
      .update(
        { Email: req.userID },
        {
          $push: { videos: { fileRef: req.file.id, size: req.file.size } },
        }
      )
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);


videoRouter.get("/upload", authenticateToken,(req, res) => {
  res.render("uploadPage.ejs");
});



videoRouter.get("/video/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  const range = req.headers.range;
  if (!range) res.status(400).send("requires range");

  db.collection("fs.files").findOne({ _id: id }, (err, v) => {
    if (err) {
      res.sendStatus(404);
      return;
    }
  
    // HTTP Status 206 for Partial Content
    const { start, headers } = generateVideoDownloadHeader(v.length, range);

    res.writeHead(206, headers);
    // Get the bucket and download stream from GridFS
    
    const bucket = new mongoose.mongo.GridFSBucket(db);
    const downloadStream = bucket.openDownloadStreamByName(v.filename, {
      start
    });

    // Finally pipe video to response
    downloadStream.pipe(res);
  });
});



videoRouter.get("/view/:id", (req, res) => {
  res.render("viewVideo.ejs", { href: "/video/" + req.params.id,questions:qrr });
});
videoRouter.get(
  "/getSuggestions",
  authenticateToken,
  EncryptID,
  async (req, res) => {
    //get videos not uploaded by the user
    const randomSuggestions = await db
      .collection("videos")
      .aggregate([
        { $match: { uploadedBy: { $ne: req.userID } } },
        { $sample: { size: 15 } },
      ])
      .toArray();
    randomSuggestions.forEach((element) => {
      element.documentRef = "/view/" + element.documentRef;
    });

    res.render("home.ejs", { randomSuggestions: randomSuggestions });
  }
);

module.exports = videoRouter;
