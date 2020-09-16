require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios").default;
const { google } = require("googleapis");

const posts = [];
const InstagramURL = "https://graph.instagram.com"
const TwitterURl = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=adaptsolutions1";
const TestToken = "IGQVJYVklMR0FGajM4dWNJVzNZAd3UwSm5rcFlwajFiY3VUWkhjVlV1YXozNWJVbmtTaGVHV1BVTTQ4ZAjU2ZAV9tVjh2ZA0xDSXg3SmFwejVKUTRFX2VYUGw1M19rdmpvUlg4QnUxeG80a3R3QVI3dTdmZAgZDZD";

app.get("/", (req, res) => {
    res.json(posts);
})

async function clock() {
    await Promise.all([
        getInstagramData(),
        getTwitterData(),
        getYouTubeData(),
        getTwitchData()
    ])
    sortFeed(posts);
};

async function getTwitterData() {
    let tweets = await axios.get(TwitterURl, {
        headers: {
            "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    });
    posts.push(...tweets.data.map((tweet) => { 
        return {
            type: "twitter", 
            data: tweet 
        } 
    }));
}

async function getInstagramData() {
    try {
        let userMediaRes = await axios.get(`${InstagramURL}/me/media?fields=permalink,thumbnail_url,usernameid,caption,media_type,media_url,username,timestamp&access_token=${TestToken}`);
        posts.push(...userMediaRes.data.data.map((post) => {
            return {
                type: "instagram",
                data: post
            }
        }));
        if (userMediaRes.data.paging.next) {
            console.log("Unimplemented");
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

async function getYouTubeData() {
    const service = google.youtube('v3');
    return new Promise((resolve, reject) => {
        service.channels.list({
            auth: process.env.YOUTUBE_API_KEY,
            part: 'snippet,contentDetails,statistics',
            forUsername: 'PewDiePie'
        }, function (err, response) {
            if (err) {
                return reject(err);
            }
            service.playlistItems.list({
                part: "contentDetails,id,snippet,status",
                auth: process.env.YOUTUBE_API_KEY,
                playlistId: response.data.items[0].contentDetails.relatedPlaylists.uploads
            }, (err, playlistItems) => {
                if (err) {
                    return reject(err);
                }
                posts.push(...playlistItems.data.items.map((video) => {
                    return {
                        type: "youtube",
                        data: video
                    }
                }))
                resolve();
            })
        })
    })
}

async function getTwitchData() {
    const tokenPayload = await getTwitchAccessToken();
    await getStream(tokenPayload.access_token);
    await getTwitchVideos(tokenPayload.access_token);
}

async function getTwitchAccessToken() {
    const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`)
    return response.data;
}

async function getStream(accessToken) {
    const response = await axios.get(`https://api.twitch.tv/helix/streams?user_login=loltyler1`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
    })
    posts.push({
        type: "twitch_stream",
        data: response.data.data
    });
}

async function getTwitchVideos(accessToken) {
    try {
        const userResponse = await axios.get(`https://api.twitch.tv/helix/users?login=loltyler1`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Client-Id": process.env.TWITCH_CLIENT_ID
            }
        });
        const user = userResponse.data.data[0];
        const videosResponse = await axios.get(`https://api.twitch.tv/helix/videos?user_id=${user.id}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Client-Id": process.env.TWITCH_CLIENT_ID
            }
        });
        posts.push(...videosResponse.data.data.map((video) => {
            return {
                type: "twitch_video",
                data: video
            }
        }));
    } catch (error) {
        console.log(error.response.data);
    }
}

function sortFeed(posts) {
    posts.sort((a, b) => {
        const dateA = getDate(a);
        const dateB = getDate(b);
        return dateB - dateA;
    })
}

function getDate(post) {
    switch (post.type) {
        case "twitter":
            return new Date(post.data.created_at);
        case "instagram":
            return new Date(post.data.timestamp);
        case "youtube":
            return new Date(post.data.snippet.publishedAt);
        case "twitch_stream":
            return new Date();
        case "twitch_video":
            return new Date(post.data.published_at)
    }
}

app.listen(8080, () => {
    clock();
    setInterval(clock, 1000 * 60 * 60);
    console.log("Server is listening on 8080");
})