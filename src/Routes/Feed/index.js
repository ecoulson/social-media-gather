const router = require("express").Router();
const Post = require('../../Models/Post');
const Axios = require("axios").default;
const XmlParser = require("express-xml-bodyparser");
const { google } = require("googleapis");
const requiresAuth = require("../../Middleware/RequiresAuth");

router.get("/", requiresAuth(), async (req, res) => {
    const feed = await Post
        .find({
            userId: {
                $in: req.user.following
            }
        })
        .skip(parseInt(req.query.offset))
        .sort({ timeCreated: -1 })
        .limit(20)
        .exec()
    return res.json(feed);
})

router.get("/twitch/callback", (req, res) => {
    res.type("text/plain").status(200).send(req.query["hub.challenge"]);
})

router.post("/twitch/callback", async (req, res) => {
    const userLiveStreams = req.body.data
    if (userLiveStreams.length === 1) {
        const tokePayload = await getTwitchAccessToken();
        const twitchLiveStreamPost = new Post({
            type: "TWITCH_STREAM",
            timeCreated: new Date(userLiveStreams[0].started_at),
            userId: req.query.user_id,
            twitchStream: {
                url: `https://www.twitch.tv/${userLiveStreams[0].user_name}`,
                live: true,
                gameName: await getGameName(tokePayload.access_token, userLiveStreams[0].game_id),
                userName: userLiveStreams[0].user_name,
                startedAt: new Date(userLiveStreams[0].started_at),
                title: userLiveStreams[0].title,
                thumbnailUrl: userLiveStreams[0].thumbnail_url
            }
        })
        await twitchLiveStreamPost.save();
    } else {
        await Post.findAndUpdate({
            "twitchStream.live": true,
            userId: req.query.user_id
        }, {
            $set: {
                "twitchStream.live": false,
                "twitchStream.endedAt": new Date()
            }
        }).exec();
    }
    res.status(200).send();
})

async function getTwitchAccessToken() {
    const response = await Axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`)
    return response.data;
}

async function getGameName(accessToken, gameId) {
    const response = await Axios.get(`https://api.twitch.tv/helix/games?id=${gameId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
    })
    if (response.data.data.length === 0) {
        return "";
    }
    return response.data.data[0].name;
}

router.get("/youtube/callback", (req, res) => {
    res.type("text/plain").status(200).send(req.query["hub.challenge"]);
})

router.post("/youtube/callback", XmlParser({trim: false, explicitArray: false}), async (req, res) => {
    const service = google.youtube('v3');
    const video = await getVideo(service, req.body.feed.entry["yt:videoid"]);
    await createVideoPost(video, req.query.userId);
    return res.status(200).send();
});

function getVideo(youtube, videoId) {
    return new Promise((resolve, reject) => {
        youtube.videos.list({
            part: "snippet,contentDetails,statistics,player,liveStreamingDetails",
            id: videoId,
            auth: process.env.YOUTUBE_API_KEY
        }, (err, videos) => {
            if (err) {
                return reject(err);
            }
            return resolve(videos.data.items[0]);
        })
    })
}

function createVideoPost(video, userId) {
    const videoPost = new Post({
        type: "YOUTUBE_VIDEO",
        userId: userId,
        timeCreated: video.snippet.publishedAt,
        youtubeVideo: {
            publishedAt: video.snippet.publishedAt,
            thumbnailUrl: getThumbnail(video.snippet.thumbnails),
            title: video.snippet.title,
            videoId: video.id
        }
    })
    return videoPost.save();
}

function getThumbnail(thumbnails) {
    if (thumbnails.standard) {
        return thumbnails.standard.url
    }
    if (thumbnails.high) {
        return thumbnails.high.url
    }
    if (thumbnails.maxres) {
        return thumbnails.maxres.url
    }
    if (thumbnails.medium) {
        return thumbnails.medium.url
    }
    return thumbnails.default.url
}

module.exports = router;