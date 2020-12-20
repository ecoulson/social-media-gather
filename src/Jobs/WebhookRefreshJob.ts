import Axios from "axios";
import Webhook from "../Models/Webhook";
import qs from "querystring";

async function WebhookRefreshJob(thresholdDate) {
    const accessToken = await getTwitchAccessToken();
    const webhooks = await getWebhooksInThreshold(thresholdDate);
    await cancel(webhooks, accessToken.access_token);
    await renew(webhooks, accessToken.access_token);
}

async function getWebhooksInThreshold(thresholdDate) {
    const webhooks = await Webhook.find({
        expirationDate: {
            $lte: thresholdDate
        }
    });

    return webhooks;
}

async function renew(webhooks, accessToken) {
    webhooks.forEach(async (webhook) => {
        const leaseTime = 60 * 60 * 24 * 7;
        const now = new Date();
        now.setSeconds(now.getSeconds() + leaseTime);
        webhook.expirationDate = now;
        webhook.save();
        switch (webhook.platform) {
            case "twitch":
                await Axios.post("https://api.twitch.tv/helix/webhooks/hub", {
                    "hub.callback": webhook.callbackURL,
                    "hub.mode": "subscribe",
                    "hub.lease_seconds": leaseTime,
                    "hub.topic": webhook.topicURL
                }, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Client-Id": process.env.TWITCH_CLIENT_ID
                    }
                });
                break;
            case "youtube":
                const webhookPostData = {
                    "hub.mode": "subscribe",
                    "hub.lease_seconds": leaseTime,
                    "hub.callback": `${process.env.BASE_URL}/api/feed/youtube/callback?userId=${webhook.userId}`,
                    "hub.verify": "async",
                    "hub.topic": `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${webhook.channelId}`,
                }
                await Axios.post("https://pubsubhubbub.appspot.com/subscribe", qs.stringify(webhookPostData), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });
                break;
            default:
                break;
        }
    })
}

async function cancel(webhooks, accessToken) {
    webhooks.forEach(async (webhook) => {
        switch (webhook.platform) {
            case "twitch":
                await Axios.post("https://api.twitch.tv/helix/webhooks/hub", {
                    "hub.mode": "unsubscribe",
                    "hub.topic": webhook.topicURL,
                    "hub.callback": webhook.callbackURL
                }, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Client-Id": process.env.TWITCH_CLIENT_ID
                    }
                });
                break;
            case "youtube":
                const webhookPostData = {
                    "hub.mode": "subscribe",
                    "hub.callback": `${process.env.BASE_URL}/api/feed/youtube/callback?userId=${webhook.userId}`,
                    "hub.verify": "async",
                    "hub.topic": `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${webhook.channelId}`,
                }
                await Axios.post("https://pubsubhubbub.appspot.com/subscribe", qs.stringify(webhookPostData), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });
                break;
            default:
                break;
        }
    })
}

async function getTwitchAccessToken() {
    const response = await Axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`)
    return response.data;
}

export default WebhookRefreshJob;