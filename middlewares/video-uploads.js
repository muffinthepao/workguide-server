const fs = require("fs");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/ni6j3uv9n",
  publicKey: "public_POFNB8Fsvsbo11VI2T92PAnSOMY=",
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
});

const videoProcessingMethods = {
  uploadVideo: async (req, res, next) => {
    // console.log("1-have req.files")
    let answerUrl = "";
    console.log("from Mibbleware - req.body", req.body);
    console.log("from Mibbleware - req.file", req.file);

    async function f() {
      let promise = new Promise((resolve, reject) => {
        imagekit.upload(
          {
            file: req.file.buffer,
            fileName: "testvideo.mp4", //required
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

    // imagekit.upload(
    //   {
    //     file: req.file.buffer,
    //     fileName: "testvideo.mp4", //required
    //     folder: "Workguide",
    //   },
    //   function (err, response) {
    //     if (err) {
    //       reject(err);
    //       console.log(err);
    //       return res.status(500).json({
    //         status: "failed",
    //         message: "An error occured during file upload. Please try again.",
    //       });
    //     } else {
    //       // resolve(response.thumbnailUrl);
    //       console.log("3 -", response.url);
    //     }
    //   }
    // );

    return next();
    // if (req.files) {
    // }
  },
};

module.exports = videoProcessingMethods;
