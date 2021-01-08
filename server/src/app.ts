import Loaders from "./Loaders";

async function startServer(): Promise<void> {
    const server = await Loaders({});

    server.listen(process.env.PORT, () => {
        console.log("Server is listening on 8080");
    });
}

export default {
    start: startServer
};
