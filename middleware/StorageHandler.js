const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const db=require("../db/ConnectDB");

const storage = new GridFsStorage({
  db: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const id = buf.toString("hex");
        const fileInfo = {
          id: id,
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage }).single("file");

module.exports = upload;
