import "reflect-metadata";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Application } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import "../Controllers";
import { Container } from "inversify";

export default (container: Container): Application => {
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
        app.use(morgan("dev"));
        app.use(bodyParser.json());
        app.use(cookieParser());
    });

    return server.build();
};
