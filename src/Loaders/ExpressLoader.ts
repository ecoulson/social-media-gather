import "reflect-metadata";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import path from "path";
import Routes from "../Routes";
import "../Controllers";
import { Container } from "inversify";

export default (container: Container): Application => {
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
        app.use(morgan("dev"));
        app.use(bodyParser.json());
        app.use(cookieParser());

        app.use("/api", Routes);

        app.use("/", express.static(path.join(__dirname, "..", "..", "client", "build")));

        // app.get("*", (req, res) => {
        //     res.sendFile(path.join(__dirname, "..", "..", "client", "build", "index.html"));
        // });
    });

    return server.build();
};
