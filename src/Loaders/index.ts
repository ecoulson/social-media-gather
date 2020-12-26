import { Application } from "express";
import ControllerLoader from "./ControllerLoader";
import DILoader from "./DILoader";
import ExpressLoader from "./ExpressLoader";
import MongooseLoader from "./MongooseLoader";

export default async (configuration: Record<string, unknown>): Promise<Application> => {
    console.log("Configured with:", JSON.stringify(configuration, null, 4));
    const container = DILoader();
    console.log("Dependencies injected.");
    ControllerLoader(container);
    console.log("Controllers loaded.");
    const server = ExpressLoader(container);
    console.log("Express initialized.");
    await MongooseLoader();
    console.log("MongoDB initialized.");
    return server;
};
