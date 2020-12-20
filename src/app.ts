require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import Routes from "./index";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import WebhookRefreshJob from "./Jobs/WebhookRefreshJob";
import TwitterRefreshJob from "./Jobs/TwitterRefreshJob";

const app = express();

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("connected to db")
}).catch(() => {
    console.log("failed to connect to db")
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(Routes);

app.use("/", express.static(path.join(__dirname, 'client', 'build')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const threshold = new Date();
threshold.setSeconds(24 * 60 * 60);
WebhookRefreshJob(threshold);
TwitterRefreshJob();
setInterval(() => {
    const threshold = new Date();
    threshold.setSeconds(24 * 60 * 60);
    WebhookRefreshJob(threshold);
}, 12 * 60 * 60 * 1000)

setInterval(() => {
    TwitterRefreshJob();
}, 10 * 60 * 1000);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on 8080");
})