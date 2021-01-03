import { Router } from "express";
// import Post from "../../Schemas/Mongo/Post/PostModel";
// import XmlParser from "express-xml-bodyparser";
// import { google, youtube_v3 } from "googleapis";

const router = Router();

// router.get("/youtube/callback", (req, res) => {
//     res.type("text/plain").status(200).send(req.query["hub.challenge"]);
// });

// router.post(
//     "/youtube/callback",
//     XmlParser({ trim: false, explicitArray: false }),
//     async (req, res) => {
//         const service = google.youtube("v3");
//         const video = await getVideo(service, req.body.feed.entry["yt:videoid"]);
//         if (await Post.findOne({ "youtubeVideo.videoId": video.id })) {
//             return res.status(200).send();
//         }
//         await createVideoPost(video, req.query.userId as string);
//         return res.status(200).send();
//     }
// );

// function getVideo(youtube: youtube_v3.Youtube, videoId: string): Promise<youtube_v3.Schema$Video> {
//     return new Promise((resolve, reject) => {
//         youtube.videos.list(
//             {
//                 part: ["snippet", "contentDetails", "statistics", "player", "liveStreamingDetails"],
//                 id: [videoId],
//                 auth: process.env.YOUTUBE_API_KEY
//             },
//             (err, videos) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 return resolve(videos.data.items[0]);
//             }
//         );
//     });
// }

// function createVideoPost(video: youtube_v3.Schema$Video, userId: string) {
//     const videoPost = new Post({
//         type: "YOUTUBE_VIDEO",
//         userId: userId,
//         timeCreated: video.snippet.publishedAt,
//         youtubeVideo: {
//             publishedAt: video.snippet.publishedAt,
//             thumbnailUrl: getThumbnail(video.snippet.thumbnails),
//             title: video.snippet.title,
//             videoId: video.id
//         }
//     });
//     return videoPost.save();
// }

// function getThumbnail(thumbnails: youtube_v3.Schema$ThumbnailDetails) {
//     if (thumbnails.standard) {
//         return thumbnails.standard.url;
//     }
//     if (thumbnails.high) {
//         return thumbnails.high.url;
//     }
//     if (thumbnails.maxres) {
//         return thumbnails.maxres.url;
//     }
//     if (thumbnails.medium) {
//         return thumbnails.medium.url;
//     }
//     return thumbnails.default.url;
// }

export default router;
