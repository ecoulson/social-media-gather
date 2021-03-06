import { Application } from "express";
import Types from "../@Types/Types";
import IConfig from "../Config/IConfig";
import ControllerLoader from "./ControllerLoader";
import DILoader from "./DILoader";
import ExpressLoader from "./ExpressLoader";
import MongooseLoader from "./MongooseLoader";
import SentryLoader from "./SentryLoader";
import SubscriberLoader from "./SubscriberLoader";
import TwitterJobLoader from "./TwitterJobLoader";
import WebhookJobLoader from "./WebhookJobLoader";

export default async (configuration: Record<string, unknown>): Promise<Application> => {
    console.log("Configured with:", JSON.stringify(configuration, null, 4));
    SentryLoader();
    const container = DILoader();
    console.log("Dependencies injected...");
    const config = container.get<IConfig>(Types.Config);
    ControllerLoader(container);
    console.log("Controllers loaded...");
    const server = ExpressLoader(container);
    console.log("Express initialized...");
    await MongooseLoader(config);
    console.log("MongoDB initialized...");
    TwitterJobLoader();
    console.log("Started twitter job...");
    WebhookJobLoader();
    console.log("Started webhook job...");
    SubscriberLoader();
    console.log("Subscribed to message queue...");
    return server;
};
