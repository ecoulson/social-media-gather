require("dotenv").config();
const Post = require("../src/Models/Post");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(async () => {
    await main();
    console.log("done");
    mongoose.disconnect();
}).catch((err) => {
    console.log(err)
});

async function main() {
    const instaPosts = await Post.find({ type: "INSTAGRAM" });
    await Promise.all(instaPosts.map(async (post) => {
        const date = post.timeCreated;
        post.timeCreated = new Date(date * 1000);
        post.instagram.takenAt = post.timeCreated;
        return post.save();
    }))
}