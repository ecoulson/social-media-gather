import Axios from "axios";
import TwitchAPIClient from "../TwitchAPIClient";
import IRegisterWebhookOptions from "./IRegisterWebhookOptions";

export default class WebhookClient {
    constructor(private twitchAPIClient: TwitchAPIClient) {}

    async register(options: IRegisterWebhookOptions): Promise<void> {
        const token = await this.twitchAPIClient.token.getAppAccessToken();
        await Axios.post(
            "https://api.twitch.tv/helix/webhooks/hub",
            {
                "hub.callback": options.callbackURL,
                "hub.mode": options.mode,
                "hub.lease_seconds": options.leaseSeconds,
                "hub.topic": options.topicURL
            },
            {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    "Client-Id": await this.twitchAPIClient.clientId()
                }
            }
        );
    }
}
