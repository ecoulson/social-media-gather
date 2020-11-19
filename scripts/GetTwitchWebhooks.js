const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "..", ".env")
});
const Axios = require("axios").default;

async function getTwitchAccessToken() {
    const response = await Axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`)
    return response.data;
}

async function getWebhooks() {
    try {
        const payload = await getTwitchAccessToken();
        const response = await Axios.get("https://api.twitch.tv/helix/webhooks/subscriptions", {
            headers: {
                "Client-Id": process.env.TWITCH_CLIENT_ID,
                "Client-Secret": process.env.TWITCH_CLIENT_ID,
                authorization: `Bearer ${payload.access_token}`
            }
        });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

(async function () {
    getWebhooks();
})()