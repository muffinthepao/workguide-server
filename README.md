#Workguide
Navigating through work can be tough.
Don't go at it alone. Get a local guide.
___
App URL: https://main--workguide.netlify.app/
___
A site that aims to solve 3 problems
- Fresh Grads / Fresh Hires get their buring questions about work answered through video answers
- There is a shortage of career guides/mentors and those that do get a slot, ask the same questions 80% of the time (pareto). This app aims to free up the guides/mentors' time by recording their answer once and uploading it onto the site. Now guides/mentors are able to use their valuable time for the 20% typy of questions
- Guides/Mentors are great during face-2-face interactions but might be stiff when recording themselves. Hence created a video booth workflow where an answer is broken down into its relevant parts, you record each part - with as many retakes as you want, submit and the app merges the video parts for you
___
##Stack
![login-page](./PERN.png)
___
##Dependencies / Libraries
- axios
- bcrypt
- fontawesome
- imagekit
- joi
- jwt / jwt-decode
- multer
- react-dropzone
- react-hook-form
- react-toastify
- react-webcam
- sequelize
- shotstack
- tailwindcss
___
##Routes

| ROUTE  | URL                                                     |
|--------|---------------------------------------------------------|
| GET    | /categories                                             |
| GET    | /questions                                              |
| GET    | /questions/:questionId                                  |
| POST   | /questions                                              |
| PUT    | /questions/:questionId                                  |
| DEL    | /questions/:questionId                                  |
| GET    | /questions/:questionId/answers                          |
| POST   | /questions/:questionId/answers/process-multi            |
| POST   | /questions/shortstack-callback                          |
| DEL    | /questions/:questionId/answers/:answersId/process-multi |
| POST   | /questions/:questionId/answers/url-insertion            |
| PATCH  | /questions/:questionId/answers/:answerId/url-insertion  |
| DELETE | /questions/:questionId/answers/:answerId/url-insertion  |
___
Learning Challenges
- The main concept of the app - video recording and combining the video parts into one video. Tried it on vanillaJS first then on react.
- Depending on which Sequelize method you use, the response can vary
- If you `.findByPk()` if record is not present, it will return NULL
- If you use `.findAll()` without WHERE parameter, it returns an OBJECT
- If you use `.findAll()` with WHERE parameter, it returns an ARRAY and further wrapped in a "dataValues" OBJECT
- The different functions of Sequelize
- Deeding data using the built in seeding functions
- Using sequelize
- Must be an array in the seed file
- VreatedAt and UpdatedAt cannot be null. You have to see the date to `new Date()`
- Managed to utilize `useContext()` hook
- Multer + MultiForm Upload + wait for callback from Shotstack (video merger)
- Thinking about UX and allowing for users to submit video answers multiple ways - URL, file upload, videoBooth
- Drag and Drop zone for video file upload
- Using React Hook Form on 2 separate forms that are present on the same page
___
## Still to be solved
- How does the app handle duplicate questions?
- Currently retakes are only available at each part. But user should have the flexibility to review their recorded parts at any time and go to the specific part to retake before submitting.
- Maybe a [Blob database](https://azure.microsoft.com/en-gb/products/storage/blobs/?&ef_id=CjwKCAjw8JKbBhBYEiwAs3sxN3dnObSXFjqeAK3FBYWWvLyqsi_TVXSsWmOqP8iDdoRaw-nHZlI5yxoCj_oQAvD_BwE:G:s&OCID=AIDcmm9uk3nhei_SEM_CjwKCAjw8JKbBhBYEiwAs3sxN3dnObSXFjqeAK3FBYWWvLyqsi_TVXSsWmOqP8iDdoRaw-nHZlI5yxoCj_oQAvD_BwE:G:s&gclid=CjwKCAjw8JKbBhBYEiwAs3sxN3dnObSXFjqeAK3FBYWWvLyqsi_TVXSsWmOqP8iDdoRaw-nHZlI5yxoCj_oQAvD_BwE) can be implemented for videobooth drafts. So users can record at their own pace and dont have to sit through all the parts in one go.
- Should users be able to get in touch with answer givers?
- Since the video parts are stored on browser cache, and my demos are all less than 30secs each. We might face an issue when each video part is a max of 1min. Not sure whether chrome will crash
- currently there are many points of failure for the video booth ask I am using 2 video processing apis with ExpressJs as the server between the Client, ImageKit, and Shotstack. I can lose connectivty to each of those any any point. And the video creation will be unsuccessful
___
##Points to improve
- Created wireframes for project3 but not for this project. Felt myself wasting time refining the design as i was coding along. Sometimes I got confuses on what I wanted or what I was doing.
- 
