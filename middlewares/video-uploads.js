const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
});

const videoProcessingMethods = {
  // uploadVideo: async (req, res, next) => {
  //   console.log("1-have req.files")
  //   console.log("from Mibbleware - req.body", req.body);
  //   console.log("from Mibbleware - req.file", req.file);

  //   async function f() {
  //     let promise = new Promise((resolve, reject) => {
  //       imagekit.upload(
  //         {
  //           file: req.file.buffer,
  //           fileName: "testvideo.webm", //required
  //           folder: "Workguide",
  //         },
  //         function (err, response) {
  //           if (err) {
  //             reject(err);
  //             console.log(err);
  //             return res.status(500).json({
  //               status: "failed",
  //               message:
  //                 "An error occured during file upload. Please try again.",
  //             });
  //           } else {
  //             resolve(response);
  //             console.log("3 -", response);
  //           }
  //         }
  //       );
  //     });

  //     let result = await promise; // wait until the promise resolves (*)

  //     return result // "done!"
  //   }

  //   let response = await f()

  //   req.file = response.url

  //   console.log("response", response)


  //   return next();
  // },
  uploadMultipleVideos: async (req, res, next) => {
    console.log("from Mibbleware - req.body", req.body);
    console.log("from Mibbleware - req.files", req.files);

    if (req.files) {
      //multer midleware allows the req.file to come through
      console.log(" 1-have req.files");
      console.log("2-req.files--->");
      const promises = req.files.map(async (file) => {
        return await new Promise((resolve, reject) => {
          const response = imagekit.upload(
            {
              file: file.buffer,
              fileName: file.originalname, //required
              folder: "listing_images",
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
                resolve(response.url);
                console.log("3 -", response.url);
                console.log("4 - store in dbs", response.url);
              }
            }
          );
          return response
        });
      });
      const fileUrls = await Promise.all(promises);
      req.files = [...fileUrls]
      return next()
    } else {
      console.log("no req.file");
      return res.status(500).json({
        status: "failed",
        message: "An video file is required",
      });
    }
  },
    
};

module.exports = videoProcessingMethods;
