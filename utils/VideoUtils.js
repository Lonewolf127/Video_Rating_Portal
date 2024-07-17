module.exports = {
  generateVideoDownloadHeader: (videoSize, range) => {
    const start = Number(range.replace(/\D/g, ""));
    const end = videoSize - 1;
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    return { headers, start };
  },

  encryptVideoId: (id) => {},
};
