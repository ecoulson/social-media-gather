import ExpressLoader from "./ExpressLoader";
import ILoaderConfiguration from "./ILoaderConfiguration";
import MongooseLoader from "./MongooseLoader";

export default async (configuration : ILoaderConfiguration) => {
    ExpressLoader(configuration.app);
    console.log("Express initialized");
    await MongooseLoader();
    console.log("MongoDB initialized");
}