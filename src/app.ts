require("dotenv").config();
import express from "express";
import Loaders from "./Loaders";

async function startServer() {
    const app = express();

    await Loaders({
        app
    });

    app.listen(process.env.PORT, () => {
        console.log("Server is listening on 8080");
    })
}

startServer();