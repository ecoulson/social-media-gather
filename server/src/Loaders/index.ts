import { Application } from "express";
import ControllerLoader from "./ControllerLoader";
import DILoader from "./DILoader";
import ExpressLoader from "./ExpressLoader";
import InstagramLoader from "./InstagramLoader";
import MongooseLoader from "./MongooseLoader";
import TwitterJobLoader from "./TwitterJobLoader";
import WebhookJobLoader from "./WebhookJobLoader";

export default async (configuration: Record<string, unknown>): Promise<Application> => {
    console.log("Configured with:", JSON.stringify(configuration, null, 4));
    await InstagramLoader();
    console.log("Instantiated instagram api...");
    const container = DILoader();
    console.log("Dependencies injected...");
    ControllerLoader(container);
    console.log("Controllers loaded...");
    const server = ExpressLoader(container);
    console.log("Express initialized...");
    await MongooseLoader();
    console.log("MongoDB initialized...");
    TwitterJobLoader();
    console.log("Started twitter job...");
    WebhookJobLoader();
    console.log("Started webhook job...");
    return server;
};
