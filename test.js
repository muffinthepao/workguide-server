const urls = [
  "https://ik.imagekit.io/7m4pg6sx4/workguide/blob_QV03qPJNJ.mp4",
  "https://ik.imagekit.io/7m4pg6sx4/workguide/blob_dNa4mDRSOu.mp4",
  "https://ik.imagekit.io/7m4pg6sx4/workguide/blob_XQl9jVBxLI.mp4",
  "https://ik.imagekit.io/7m4pg6sx4/workguide/blob_a29mA_jPP.mp4",
];

const duration = [4, 2, 3, 2];
let array = [];

let startingTime = 0;
for (let i = 0; i < urls.length; i++) {
  array.push({
    clips: [
      {
        asset: {
          type: "video",
          src: urls[i],
        },
        start: startingTime,
        length: duration[i],
      },
    ],
  });

  startingTime += duration[i]
}

// let array = urls.map((url, index) => {
//   for (let i=0; i <= index; i++) {

//   }

//   return {
//     clips: [
//       {
//         asset: {
//           type: "video",
//           src: url,
//         },
//         start: 0,
//         length: duration[index],
//       },
//     ],
//   };
//   // } else {
//   //   return {
//   //     "clips": [
//   //       {
//   //         "asset": {
//   //           "type": "video",
//   //           "src": url
//   //         },
//   //         "start": 0,
//   //         "length": duration[index]
//   //       }
//   //     ]
//   //   }
//   // }
// });

console.log(array[0].clips);
console.log(array[1].clips);
console.log(array[2].clips);
console.log(array[3].clips);
