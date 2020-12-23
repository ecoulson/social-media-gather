import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import Routes from "../Routes";

export default (app : Application) => {
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use("/api", Routes);

    app.use("/", express.static(path.join(__dirname, 'client', 'build')));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}