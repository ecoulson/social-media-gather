import mongoose, { Connection } from "mongoose";
import IConfig from "../Config/IConfig";

export default async (config: IConfig): Promise<Connection> => {
    const connection = await mongoose.connect(await config.getValue("MONGO_DB_CONNECTION_STRING"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    return connection.connection;
};
