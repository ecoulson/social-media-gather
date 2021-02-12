import { config } from "aws-sdk";
import { IgApiClient } from "instagram-private-api";
import { inject } from "inversify";
import Types from "../../@Types/Types";
import IConfig from "../../Config/IConfig";

export default class InstagramAPIClient {
    private igClient: IgApiClient;

    constructor(@inject(Types.Config) config: IConfig) {
        this.igClient = new IgApiClient();
        config.getValue("INSTAGRAM_USER").then((username) => {
            this.igClient.state.generateDevice(username);
            this.setupInstagram(this.igClient, config);
        });
    }

    client() {
        return this.igClient;
    }

    private async setupInstagram(instagramApiClient: IgApiClient, config: IConfig) {
        try {
            await instagramApiClient.simulate.preLoginFlow();
            await instagramApiClient.account.login(
                await config.getValue("INSTAGRAM_USER"),
                await config.getValue("INSTAGRAM_PASSWORD")
            );
            await instagramApiClient.simulate.postLoginFlow();
        } catch (e) {
            console.log(e);
            const challenge = await instagramApiClient.challenge.state();
            await instagramApiClient.challenge.selectVerifyMethod(challenge.step_data.choice);
            const code = "000000"; //await getCode(auth);
            await instagramApiClient.challenge.sendSecurityCode(code);
            // console.log(await ig.challenge.state());
        }
    }
}
