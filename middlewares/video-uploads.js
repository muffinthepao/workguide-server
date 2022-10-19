const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/ni6j3uv9n",
  publicKey: "public_POFNB8Fsvsbo11VI2T92PAnSOMY=",
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
});

const videoProcessingMethods = {
  uploadVideo: async (req, res, next) => {
    console.log("1-have req.files")

    return next()
    // if (req.files) {
    // }
  }
}



module.exports = videoProcessingMethods;