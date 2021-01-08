import { IgApiClient } from "instagram-private-api";
import Types from "../@Types/Types";
import container from "../bootstrap";

export default async (): Promise<IgApiClient> => {
    const ig = new IgApiClient();

    ig.state.generateDevice(process.env.INSTAGRAM_USER);
    await setupInstagram(ig);

    container.bind<IgApiClient>(Types.InstagramAPIClient).toConstantValue(ig);
    return ig;
};

async function setupInstagram(instagramApiClient: IgApiClient) {
    try {
        await instagramApiClient.simulate.preLoginFlow();
        await instagramApiClient.account.login(
            process.env.INSTAGRAM_USER,
            process.env.INSTAGRAM_PASSWORD
        );
    } catch (e) {
        const challenge = await instagramApiClient.challenge.state();
        await instagramApiClient.challenge.selectVerifyMethod(challenge.step_data.choice);
        const code = "000000"; //await getCode(auth);
        await instagramApiClient.challenge.sendSecurityCode(code);
        // console.log(await ig.challenge.state());
    }
    process.nextTick(async () => await instagramApiClient.simulate.postLoginFlow());
}
