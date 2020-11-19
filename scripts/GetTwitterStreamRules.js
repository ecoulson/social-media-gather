require("dotenv").config();
const Axios = require("axios").default;

async function getRules() {
    return await Axios.get("https://api.twitter.com/2/tweets/search/stream/rules", {
        headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    })
}

(async () => {
    console.log((await getRules()).data);
})()