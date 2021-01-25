import { IgApiClient } from "instagram-private-api";
import Types from "../@Types/Types";
import container from "../bootstrap";
import IConfig from "../Config/IConfig";

export default async (config: IConfig): Promise<IgApiClient> => {
    try {
        const ig = new IgApiClient();
        ig.state.generateDevice(await config.getValue("INSTAGRAM_USER"));
        await setupInstagram(ig, config);
        container.bind<IgApiClient>(Types.InstagramAPIClient).toConstantValue(ig);
        return ig;
    } catch (error) {
        console.log(error);
    }
};

async function setupInstagram(instagramApiClient: IgApiClient, config: IConfig) {
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
