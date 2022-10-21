const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
});

const videoProcessingMethods = {
  uploadVideo: async (req, res, next) => {
    console.log("1-have req.files")
    console.log("from Mibbleware - req.body", req.body);
    console.log("from Mibbleware - req.file", req.file);

    async function f() {
      let promise = new Promise((resolve, reject) => {
        imagekit.upload(
          {
            file: req.file.buffer,
            fileName: "testvideo.webm", //required
            folder: "Workguide",
          },
          function (err, response) {
            if (err) {
              reject(err);
              console.log(err);
              return res.status(500).json({
                status: "failed",
                message:
                  "An error occured during file upload. Please try again.",
              });
            } else {
              resolve(response);
              console.log("3 -", response);
            }
          }
        );
      });

      let result = await promise; // wait until the promise resolves (*)

      return result // "done!"
    }

    let response = await f()

    req.file = response.url

    console.log("response", response)


    return next();
  },
  uploadVideos: async (req, res, next) => {
    console.log("1-have req.files")
    console.log("from Mibbleware - req.body", req.body);
    console.log("from Mibbleware - req.file", req.file);

    
  },
};

module.exports = videoProcessingMethods;
