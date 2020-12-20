import { Router } from "express";
import { google } from "googleapis";
import Post from "../../Models/Post";
import Webhook from "../../Models/Webhook";
import Axios from "axios";
import User from "../../Models/User";
import qs from "querystring";
import requiresAuth from "../../Middleware/RequiresAuth";
const WebhookHubUrl = "https://pubsubhubbub.appspot.com/subscribe";

const router = Router();

router.get("/", async (req, res) => {
    res.json(await getUsers(req.query.username as string))
});

async function getUsers(username : string) {
    const service = google.youtube('v3');
    const channels = await searchChannelsByUsername(username, service) as any;
    const formattedChannels = channels.items.map((item : any) => {
        return {
            id: item.id.channelId,
            username: item.snippet.title,
            profilePicture: item.snippet.thumbnails.default.url
        }
    })
    return formattedChannels;
}

function searchChannelsByUsername(username : string, service : any) {
    return new Promise((resolve, reject) => {
        service.search.list({
            auth: process.env.YOUTUBE_API_KEY,
            part: 'snippet',
            q: username,
            type: "channel",
            maxResults: 50
        }, function (err : any, response : any) {
            if (err) {
                return reject(err);
            }
            return resolve(response.data);
        })
    })
}

router.post("/", requiresAuth(), async (req, res) => {
    res.json(await registerAccount((req as any).user, req.body.id));
})

router.post("/add", async (req, res) => {
    const user = await User.findOne({ _id: req.body.userId });
    res.json(await registerAccount(user, req.body.id))
})

async function registerAccount(user : any, channelId : string) {
    user.youtubeId = channelId;
    createYoutubePosts(channelId, user.id);
    registerWebhook(channelId, user.id);
    return await user.save();
}

async function registerWebhook(channelId : string, userId : string) {
    try {
        const leaseTime = 60 * 60 * 24 * 7;
        const now = new Date();
        const webhookPostData = {
            "hub.mode": "subscribe",
            "hub.callback": `${process.env.BASE_URL}/api/feed/youtube/callback?userId=${userId}`,
            "hub.verify": "async",
            "hub.topic": `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`,
        };
        const webhook = new Webhook({
            expirationDate: now.setSeconds(now.getSeconds() + leaseTime),
            platform: "youtube",
            topicURL: `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`,
            callbackURL: `${process.env.BASE_URL}/api/feed/youtube/callback?userId=${userId}`,
            userId: userId,
            channelId: channelId
        });
        webhook.save();
        await Axios.post(WebhookHubUrl, qs.stringify(webhookPostData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function createYoutubePosts(channelId : string, userId : string) {
    try {
        const service = google.youtube('v3');
        const channel = await getChannelById(service, channelId);
        let uploadPage = await getUploadsPage(service, channel) as any;
        let flag = true;
        while (uploadPage.data.nextPageToken || flag) {
            let videoIds = uploadPage.data.items.map((item : any) => {
                return item.contentDetails.videoId;
            });
            const videos = await getVideos(service, videoIds) as any;
            await Promise.all(videos.data.items.map((video : any) => {
                createVideoPost(video, userId);
            }));
            uploadPage = await getUploadsPage(service, channel, uploadPage.data.nextPageToken);
            flag = false;
        }
    } catch (error) {
        console.log(error);
    }
}

function getChannelById(youtube : any, channelId : string) {
    return new Promise((resolve, reject) => {
        youtube.channels.list({
            auth: process.env.YOUTUBE_API_KEY,
            part: 'snippet,contentDetails,statistics',
            id: channelId
        }, (err : any, response : any) => {
            if (err) {
                return reject(err);
            }
            return resolve(response);
        })
    });
}

async function getUploadsPage(youtube : any, channel : any, pageToken : any = undefined) {
    return new Promise((resolve, reject) => {
        youtube.playlistItems.list({
            part: "contentDetails",
            pageToken: pageToken,
            auth: process.env.YOUTUBE_API_KEY,
            playlistId: channel.data.items[0].contentDetails.relatedPlaylists.uploads,
            maxResults: 50
        }, (err : any, playlistItems : any[]) => {
            if (err) {
                return reject(err);
            }
            return resolve(playlistItems);
        })
    })
}

function getVideos(youtube : any, videoIds : string[]) {
    return new Promise((resolve, reject) => {
        youtube.videos.list({
            part: "snippet,contentDetails,statistics,player,liveStreamingDetails",
            id: videoIds.join(","),
            auth: process.env.YOUTUBE_API_KEY
        }, (err : any, videos : any[]) => {
            if (err) {
                return reject(err);
            }
            return resolve(videos);
        })
    })
}

function createVideoPost(video : any, userId : string) {
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

function getThumbnail(thumbnails : any) {
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

export default router;