import AWSConfig from "./Config/AWSConfig";
import Config from "./Config/Config";
import ProcessConfig from "./Config/ProcessConfig";
import Environment from "./Environment";
import Loaders from "./Loaders";

async function startServer(port?: string): Promise<void> {
    const config = new Config(new AWSConfig(Environment.getType()), new ProcessConfig());
    const server = await Loaders({});
    if (!port) {
        port = await config.getValue("PORT");
    }

    server.listen(port, () => {
        console.log(`Server is listening on ${port}`);
    });
}

export default {
    start: startServer
};
