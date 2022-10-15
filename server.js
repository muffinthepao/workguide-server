require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;
const db = require("./models");

const userRouter = require('./router/user-routes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/api/v1/users/", userRouter);

app.get("/", (req, res) => {
    res.send("Hello World! This is Project 4 server");
});

// app.listen(port, async () => {
//     try {
//         await mongoose.connect(mongoConnectionStr, {
//             dbName: process.env.MONGO_DB,
//         });
//     } catch (err) {
//         console.log(`Failed to connect to DB`);
//         process.exit(1);
//     }

//     console.log(`Quencher app listening on port ${port}`);
// });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
