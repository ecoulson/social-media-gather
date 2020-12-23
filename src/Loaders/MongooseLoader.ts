import mongoose from "mongoose";

export default async () => {
    const connection = await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    return connection.connection.db;
}