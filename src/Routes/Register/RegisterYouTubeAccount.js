const router = require("express").Router();
const { google } = require("googleapis");
const User = require('../../Models/User');
const Post = require("../../Models/Post");

router.get("/", async (req, res) => {
    res.json(await getUsers(req.query.username))
});

async function getUsers(username) {
    const service = google.youtube('v3');
    const channel = await searchChannelsByUsername(username, service);
    const formattedChannels = channel.items.map((item) => {
        return {
            id: item.id.channelId,
            username: item.snippet.title,
            profilePicture: item.snippet.thumbnails.default.url
        }
    })
    return formattedChannels;
}

function searchChannelsByUsername(username, service) {
    return new Promise((resolve, reject) => {
        service.search.list({
            auth: process.env.YOUTUBE_API_KEY,
            part: 'snippet',
            q: username,
            type: "channel"
        }, function (err, response) {
            if (err) {
                return reject(err);
            }
            return resolve(response.data);
        })
    })
}

router.post("/:id", async (req, res) => {
    res.json(await registerAccount(req.params.id, req.body.id));
})

async function registerAccount(userId, channelId) {
    const user = await User.findById(userId);
    user.youtubeId = channelId;
    createYoutubePosts(channelId);
    return await user.save();
}

async function createYoutubePosts(channelId) {
    try {
        const service = google.youtube('v3');
        const channel = await getChannelById(service, channelId);
        let uploadPage = await getUploadsPage(service, channel);
        while (uploadPage.data.nextPageToken) {
            let videoIds = uploadPage.data.items.map((item) => {
                return item.contentDetails.videoId;
            });
            const videos = await getVideos(service, videoIds);
            await Promise.all(videos.data.items.map((video) => {
                createVideoPost(video);
            }));
            uploadPage = await getUploadsPage(service, channel, uploadPage.data.nextPageToken);
        }
    } catch (error) {
        console.log(error);
    }
}

function getChannelById(youtube, channelId) {
    return new Promise((resolve, reject) => {
        youtube.channels.list({
            auth: process.env.YOUTUBE_API_KEY,
            part: 'snippet,contentDetails,statistics',
            id: channelId
        }, (err, response) => {
            if (err) {
                return reject(err);
            }
            return resolve(response);
        })
    });
}

async function getUploadsPage(youtube, channel, pageToken) {
    return new Promise((resolve, reject) => {
        youtube.playlistItems.list({
            part: "contentDetails",
            pageToken: pageToken,
            auth: process.env.YOUTUBE_API_KEY,
            playlistId: channel.data.items[0].contentDetails.relatedPlaylists.uploads,
            maxResults: 50
        }, (err, playlistItems) => {
            if (err) {
                return reject(err);
            }
            return resolve(playlistItems);
        })
    })
}

function getVideos(youtube, videoIds) {
    return new Promise((resolve, reject) => {
        youtube.videos.list({
            part: "snippet,contentDetails,statistics,player,liveStreamingDetails",
            id: videoIds.join(","),
            auth: process.env.YOUTUBE_API_KEY
        }, (err, videos) => {
            if (err) {
                return reject(err);
            }
            return resolve(videos);
        })
    })
}

function createVideoPost(video) {
    const videoPost = new Post({
        type: "YOUTUBE_VIDEO",
        userId: video.snippet.channelId,
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