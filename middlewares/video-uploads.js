const multer = require("multer");
const upload = multer();

const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/ni6j3uv9n",
  publicKey: "public_POFNB8Fsvsbo11VI2T92PAnSOMY=",
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
});

const videoProcessingMethods = {
  uploadVideo: async (req, res, next) => {
    // console.log("1-have req.files")

    console.log("from Mibbleware - req.body", req.body);
    console.log("from Mibbleware - req.file", req.file);

    // const reader = new FileReader();
    // reader.readAsDataURL(req.file.path);
    // reader.onloadend = function () {
    //   const base64data = reader.result;
    //   console.log(base64data);
    // };

    imagekit.upload(
      {
        file: req.file.path,
        fileName: "Test Answer", //required
        folder: "Workguide",
      },
      function (err, response) {
        if (err) {
          reject(err);
          console.log(err);
          return res.status(500).json({
            status: "failed",
            message: "An error occured during file upload. Please try again.",
          });
        } else {
          // resolve(response.thumbnailUrl);
          console.log("3 -", response);
          console.log("4 - store in dbs", response.thumbnailUrl);
        }
      }
    );

    return next();
    // if (req.files) {
    // }
  },
};

module.exports = videoProcessingMethods;
