import app from "./app";
import { config as configureEnvironment } from "dotenv";

configureEnvironment();
startServer(process.argv);

function startServer(args: string[]) {
    const port = parseInt(args[2]);
    if (isNaN(port)) {
        app.start();
    } else {
        app.start(args[2]);
    }
}
