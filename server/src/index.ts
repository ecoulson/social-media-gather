import app from "./app";
import { config as configureEnvironment } from "dotenv";

configureEnvironment();
app.start();
