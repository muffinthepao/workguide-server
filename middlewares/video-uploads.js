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
  //           fileName: "blob.mp4", //required
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

      const promises = req.files.map(async (file) => { //async waits for promise1
        return await new Promise((resolve, reject) => { // this is promise1
          const response = imagekit.upload(
            {
              file: file.buffer,
              fileName: "blob.mp4", //required
              folder: "workguide",
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
                console.log("4 - store in dbs", response);
              }
            }
          );
          return response //returns response to promise1
        });
      });
      const fileUrls = await Promise.all(promises); //returns a single promise of promises

      // let fileUrls = [
      //   {
      //     fileId: '63526b2ebf51c1dc80b06191',
      //     name: 'blob_NpNXn3uCl.mp4',
      //     size: 233771,
      //     versionInfo: { id: '63526b2ebf51c1dc80b06191', name: 'Version 1' },
      //     filePath: '/workguide/blob_NpNXn3uCl.mp4',
      //     url: 'https://ik.imagekit.io/7m4pg6sx4/workguide/blob_NpNXn3uCl.mp4',
      //     fileType: 'non-image',
      //     AITags: null
      //   },
      //   {
      //     fileId: '63526b2ebf51c1dc80b0615f',
      //     name: 'blob_cZivkwTU9.mp4',
      //     size: 194173,
      //     versionInfo: { id: '63526b2ebf51c1dc80b0615f', name: 'Version 1' },
      //     filePath: '/workguide/blob_cZivkwTU9.mp4',
      //     url: 'https://ik.imagekit.io/7m4pg6sx4/workguide/blob_cZivkwTU9.mp4',
      //     fileType: 'non-image',
      //     AITags: null
      //   },
      //   {
      //     fileId: '63526b2ebf51c1dc80b0615f',
      //     name: 'blob_cZivkwTU9.mp4',
      //     size: 194173,
      //     versionInfo: { id: '63526b2ebf51c1dc80b0615f', name: 'Version 1' },
      //     filePath: '/workguide/blob_cZivkwTU9.mp4',
      //     url: 'https://ik.imagekit.io/7m4pg6sx4/workguide/blob_cZivkwTU9.mp4',
      //     fileType: 'non-image',
      //     AITags: null
      //   }
      // ]
      let videoIds = []
      let videoUrls = []

      fileUrls.forEach (file => {
        videoIds.push(file.fileId)
        videoUrls.push(file.url)
      })
      req.body.videoIds = videoIds
      console.log("req.body", req.body)
      console.log("videoIds: ", videoIds)
      console.log("videoUrls: ", videoUrls)
      
      req.files = videoUrls
   
      return next();

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
