const axios = require("axios");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
});

const videoProcessingMethods = {
  mergeVideos: async (req, res, next) => {
    console.log("you've reached the merge video middleware");
    console.log("req.body: ", req.body);
    console.log("req.files: ", req.files);

    const videoPartDurations = req.body.blobDurations;
    const imagekitURLs = req.files;
    let shotstackArray = [];

    let startingTime = 0;
    for (let i = 0; i < imagekitURLs.length; i++) {
      shotstackArray.push({
        clips: [
          {
            asset: {
              type: "video",
              src: imagekitURLs[i],
            },
            start: startingTime,
            length: videoPartDurations[i],
          },
        ],
      });

      startingTime += videoPartDurations[i];
    }

    const dataToSend = await axios.post(
      process.env.SHOTSTACK_URL_ENDPOINT,
      {
        timeline: {
          tracks: shotstackArray,
        },
        output: {
          format: "mp4",
          resolution: "sd",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.SHOTSTACK_API_KEY,
        },
      }
    );

    console.log(dataToSend)

    res.status(201).json({ success: "answer created" });
  },
  uploadVideo: async (req, res, next) => {
    console.log("1-have req.files");
    console.log("from Mibbleware - req.body", req.body);
    console.log("from Mibbleware - req.file", req.file);

    async function f() {
      let promise = new Promise((resolve, reject) => {
        imagekit.upload(
          {
            file: req.file.buffer,
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
            }
          }
        );
      });

      let result = await promise; // wait until the promise resolves (*)

      return result; // "done!"
    }

    let response = await f();

    req.file = response.url;

    console.log("response", response);

    return next();
  },
  uploadMultipleVideos: async (req, res, next) => {
    console.log("from Mibbleware - req.body", req.body);
    console.log("from Mibbleware - req.files", req.files);

    // if (req.files) {
    // // multer midleware allows the req.file to come through
    // console.log(" 1-have req.files");
    // console.log("2-req.files--->");

    // const promises = req.files.map(async (file) => { //async waits for promise1
    //   return await new Promise((resolve, reject) => { // this is promise1
    //     const response = imagekit.upload(
    //       {
    //         file: file.buffer,
    //         fileName: "blob.mp4", //required
    //         folder: "workguide",
    //       },
    //       function (err, response) {
    //         if (err) {
    //           reject(err);
    //           console.log(err);
    //           return res.status(500).json({
    //             status: "failed",
    //             message:
    //               "An error occured during file upload. Please try again.",
    //           });
    //         } else {
    //           resolve(response);
    //           console.log("3 -", response);
    //         }
    //       }
    //     );
    //     return response //returns response to promise1
    //   });
    // });
    // const fileUrls = await Promise.all(promises); //returns a single promise of promises

    let fileUrls = [
      {
        fileId: "6353fc2ebf51c1dc80e58749",
        name: "blob_QV03qPJNJ.mp4",
        size: 304703,
        versionInfo: { id: "6353fc2ebf51c1dc80e58749", name: "Version 1" },
        filePath: "/workguide/blob_QV03qPJNJ.mp4",
        url: "https://ik.imagekit.io/7m4pg6sx4/workguide/blob_QV03qPJNJ.mp4",
        fileType: "non-image",
        AITags: null,
      },
      {
        fileId: "6353fc2ebf51c1dc80e587a0",
        name: "blob_dNa4mDRSOu.mp4",
        size: 218548,
        versionInfo: { id: "6353fc2ebf51c1dc80e587a0", name: "Version 1" },
        filePath: "/workguide/blob_dNa4mDRSOu.mp4",
        url: "https://ik.imagekit.io/7m4pg6sx4/workguide/blob_dNa4mDRSOu.mp4",
        fileType: "non-image",
        AITags: null,
      },
      {
        fileId: "6353fc2ebf51c1dc80e587f6",
        name: "blob_XQl9jVBxLI.mp4",
        size: 298674,
        versionInfo: { id: "6353fc2ebf51c1dc80e587f6", name: "Version 1" },
        filePath: "/workguide/blob_XQl9jVBxLI.mp4",
        url: "https://ik.imagekit.io/7m4pg6sx4/workguide/blob_XQl9jVBxLI.mp4",
        fileType: "non-image",
        AITags: null,
      },
      {
        fileId: "6353fc2ebf51c1dc80e587c4",
        name: "blob_a29mA_jPP.mp4",
        size: 199808,
        versionInfo: { id: "6353fc2ebf51c1dc80e587c4", name: "Version 1" },
        filePath: "/workguide/blob_a29mA_jPP.mp4",
        url: "https://ik.imagekit.io/7m4pg6sx4/workguide/blob_a29mA_jPP.mp4",
        fileType: "non-image",
        AITags: null,
      },
    ];
    let videoIds = [];
    let videoUrls = [];

    fileUrls.forEach((file) => {
      videoIds.push(file.fileId);
      videoUrls.push(file.url);
    });
    req.body.videoIds = videoIds;
    req.body.blobDurations = [4, 2, 3, 2];
    req.body.answerId = 4;
    // console.log("req.body", req.body)
    // console.log("videoIds: ", videoIds)
    // console.log("videoUrls: ", videoUrls)

    req.files = videoUrls;

    return next();

    // } else {
    //   console.log("no req.file");
    //   return res.status(500).json({
    //     status: "failed",
    //     message: "An video file is required",
    //   });
    // }
  },
};

module.exports = videoProcessingMethods;
