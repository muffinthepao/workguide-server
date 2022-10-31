require("dotenv").config();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

const userRouter = require('./router/user-routes')
const questionRouter = require('./router/question-routes')
const categoryRouter = require('./router/category-routes')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/api/v1/users/", userRouter);
app.use("/api/v1/questions/", questionRouter);
app.use("/api/v1/categories/", categoryRouter);

app.get("/", (req, res) => {
    res.send("Hello World! This is the Workguide server");
});

app.listen(port, () => {
    console.log(`Workguide app listening on port ${port}`);
});
