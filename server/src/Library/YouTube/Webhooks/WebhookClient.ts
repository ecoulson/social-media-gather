import Axios from "axios";
import IRegisterWebhookOptions from "./IRegisterWebhookOptions";
import qs from "querystring";

export default class WebhookClient {
    private static readonly WebhookHubUrl = "https://pubsubhubbub.appspot.com/subscribe";

    async register(options: IRegisterWebhookOptions): Promise<void> {
        const webhookPostData = {
            "hub.mode": options.mode,
            "hub.callback": options.callback,
            "hub.verify": "async",
            "hub.topic": options.topic
        };
        await Axios.post(WebhookClient.WebhookHubUrl, qs.stringify(webhookPostData), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
}
