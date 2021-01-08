require("dotenv").config();
const mongoose = require("mongoose");
const Posts = require("../src/Models/Post");

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(async () => {
    await main();
}).catch(() => {
    console.log("failed to connect to db")
});

async function main() {
    const mediaIdMapping = new Map();
    const medias = ["twitch", "youtube", "twitter", "instagram"];

    medias.forEach((media) => {
        mediaIdMapping.set(media, new Set());
    })
    
    const posts = await Posts.find();
    const deleteTasks = [];
    posts.forEach(async (post) => {
        if (post.youtubeVideo) {
            const ids = mediaIdMapping.get("youtube");
            if (ids.has(post.youtubeVideo.videoId)) {
                deleteTasks.push(Posts.findByIdAndDelete(post.id));
            } else {
                ids.add(post.youtubeVideo.videoId)
            }
        } else if (post.twitchStream) {
            
        } else if (post.twitchVideo) {

        } else if (post.instagram) {
            const ids = mediaIdMapping.get("instagram");
            if (ids.has(post.instagram.id)) {
                deleteTasks.push(Posts.findByIdAndDelete(post.id));
            } else {
                ids.add(post.instagram.id)
            }
        } else {
            const ids = mediaIdMapping.get("twitter");
            if (ids.has(post.tweet.id)) {
                deleteTasks.push(Posts.findByIdAndDelete(post.id));
            } else {
                ids.add(post.tweet.id)
            }
        }
    });
    await Promise.all(deleteTasks);
    console.log("done");
}