import Axios from "axios";
import Webhook from "../Schemas/Mongo/Webhook/WebhookModel";
import qs from "querystring";
import IWebhookDocument from "../Schemas/Mongo/Webhook/IWebhookDocument";
import container from "../bootstrap";
import IConfig from "../Config/IConfig";
import Types from "../@Types/Types";

async function WebhookRefreshJob(thresholdDate: Date): Promise<void> {
    const accessToken = await getTwitchAccessToken();
    const webhooks = await getWebhooksInThreshold(thresholdDate);
    await cancel(webhooks, accessToken.access_token);
    await renew(webhooks, accessToken.access_token);
}

async function getWebhooksInThreshold(thresholdDate: Date) {
    const webhooks = await Webhook.find({
        expirationDate: {
            $lte: thresholdDate
        }
    });

    return webhooks;
}

async function renew(webhooks: IWebhookDocument[], accessToken: string) {
    const config = container.get<IConfig>(Types.Config);
    webhooks.forEach(async (webhook) => {
        const leaseTime = 60 * 60 * 24 * 7;
        const now = new Date();
        now.setSeconds(now.getSeconds() + leaseTime);
        webhook.expirationDate = now;
        webhook.save();
        switch (webhook.platform) {
            case "twitch":
                await Axios.post(
                    "https://api.twitch.tv/helix/webhooks/hub",
                    {
                        "hub.callback": webhook.callbackURL,
                        "hub.mode": "subscribe",
                        "hub.lease_seconds": leaseTime,
                        "hub.topic": webhook.topicURL
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Client-Id": await config.getValue("TWITCH_CLIENT_ID")
                        }
                    }
                );
                break;
            case "youtube":
                const webhookPostData = {
                    "hub.mode": "subscribe",
                    "hub.lease_seconds": leaseTime,
                    "hub.callback": `${await config.getValue(
                        "BASE_URL"
                    )}/api/feed/youtube/callback?channelId=${webhook.channelId}`,
                    "hub.verify": "async",
                    "hub.topic": `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${webhook.platformId}`
                };
                await Axios.post(
                    "https://pubsubhubbub.appspot.com/subscribe",
                    qs.stringify(webhookPostData),
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }
                );
                break;
            default:
                break;
        }
    });
}

async function cancel(webhooks: IWebhookDocument[], accessToken: string) {
    const config = container.get<IConfig>(Types.Config);
    webhooks.forEach(async (webhook) => {
        switch (webhook.platform) {
            case "twitch":
                await Axios.post(
                    "https://api.twitch.tv/helix/webhooks/hub",
                    {
                        "hub.mode": "unsubscribe",
                        "hub.topic": webhook.topicURL,
                        "hub.callback": webhook.callbackURL
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Client-Id": await config.getValue("TWITCH_CLIENT_ID")
                        }
                    }
                );
                break;
            case "youtube":
                const webhookPostData = {
                    "hub.mode": "subscribe",
                    "hub.callback": `${await config.getValue(
                        "BASE_URL"
                    )}/api/feed/youtube/callback?channelId=${webhook.channelId}`,
                    "hub.verify": "async",
                    "hub.topic": `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${webhook.platformId}`
                };
                await Axios.post(
                    "https://pubsubhubbub.appspot.com/subscribe",
                    qs.stringify(webhookPostData),
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }
                );
                break;
            default:
                break;
        }
    });
}

async function getTwitchAccessToken() {
    const config = container.get<IConfig>(Types.Config);
    const response = await Axios.post(
        `https://id.twitch.tv/oauth2/token?client_id=${await config.getValue(
            "TWITCH_CLIENT_ID"
        )}&client_secret=${await config.getValue(
            "TWITCH_CLIENT_SECRET"
        )}&grant_type=client_credentials`
    );
    return response.data;
}

export default WebhookRefreshJob;
