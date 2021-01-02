import { Router } from "express";
import Post from "../../Schemas/Mongo/Post/PostModel";
import Axios from "axios";
import XmlParser from "express-xml-bodyparser";
import { google, youtube_v3 } from "googleapis";
import requiresAuth from "../../Middleware/RequiresAuth";

const router = Router();

router.get("/", requiresAuth(), async (req, res) => {
    const feed = await Post.find({
        userId: {
            $in: req.user.following
        }
    })
        .skip(parseInt(req.query.offset as string))
        .sort({ timeCreated: -1 })
        .limit(20)
        .exec();
    return res.json(feed);
});

router.get("/twitch/callback", (req, res) => {
    res.type("text/plain").status(200).send(req.query["hub.challenge"]);
});

router.post("/twitch/callback", async (req, res) => {
    res.send("Ok").status(200);
    const userLiveStreams = req.body.data;
    if (userLiveStreams.length === 1) {
        const tokePayload = await getTwitchAccessToken();
        if (await Post.findOne({ "twitchStream.streamId": userLiveStreams[0].id })) {
            return;
        }
        const twitchLiveStreamPost = new Post({
            type: "TWITCH_STREAM",
            timeCreated: new Date(userLiveStreams[0].started_at),
            userId: req.query.user_id,
            twitchStream: {
                streamId: userLiveStreams[0].id,
                url: `https://www.twitch.tv/${userLiveStreams[0].user_name}`,
                live: true,
                gameName: await getGameName(tokePayload.access_token, userLiveStreams[0].game_id),
                userName: userLiveStreams[0].user_name,
                startedAt: new Date(userLiveStreams[0].started_at),
                title: userLiveStreams[0].title,
                thumbnailUrl: userLiveStreams[0].thumbnail_url
            }
        });
        await twitchLiveStreamPost.save();
    } else {
        await Post.findOneAndUpdate(
            {
                userId: req.query.user_id as string,
                "twitchStream.live": true
            },
            {
                $set: {
                    "twitchStream.live": false,
                    "twitchStream.endedAt": new Date()
                }
            }
        );
    }
    res.status(200).send();
});

async function getTwitchAccessToken() {
    const response = await Axios.post(
        `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
    );
    return response.data;
}

async function getGameName(accessToken: string, gameId: string) {
    const response = await Axios.get(`https://api.twitch.tv/helix/games?id=${gameId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
    });
    if (response.data.data.length === 0) {
        return "";
    }
    return response.data.data[0].name;
}

router.get("/youtube/callback", (req, res) => {
    res.type("text/plain").status(200).send(req.query["hub.challenge"]);
});

router.post(
    "/youtube/callback",
    XmlParser({ trim: false, explicitArray: false }),
    async (req, res) => {
        const service = google.youtube("v3");
        const video = await getVideo(service, req.body.feed.entry["yt:videoid"]);
        if (await Post.findOne({ "youtubeVideo.videoId": video.id })) {
            return res.status(200).send();
        }
        await createVideoPost(video, req.query.userId as string);
        return res.status(200).send();
    }
);

function getVideo(youtube: youtube_v3.Youtube, videoId: string): Promise<youtube_v3.Schema$Video> {
    return new Promise((resolve, reject) => {
        youtube.videos.list(
            {
                part: ["snippet", "contentDetails", "statistics", "player", "liveStreamingDetails"],
                id: [videoId],
                auth: process.env.YOUTUBE_API_KEY
            },
            (err, videos) => {
                if (err) {
                    return reject(err);
                }
                return resolve(videos.data.items[0]);
            }
        );
    });
}

function createVideoPost(video: youtube_v3.Schema$Video, userId: string) {
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
    });
    return videoPost.save();
}

function getThumbnail(thumbnails: youtube_v3.Schema$ThumbnailDetails) {
    if (thumbnails.standard) {
        return thumbnails.standard.url;
    }
    if (thumbnails.high) {
        return thumbnails.high.url;
    }
    if (thumbnails.maxres) {
        return thumbnails.maxres.url;
    }
    if (thumbnails.medium) {
        return thumbnails.medium.url;
    }
    return thumbnails.default.url;
}

export default router;
