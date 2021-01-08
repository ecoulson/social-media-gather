require("dotenv").config();
const IgApiClient = require("instagram-private-api").IgApiClient;
const ig = new IgApiClient();
const InstagramPass = "#K6qC3E4K6D%%mgCn";
const InstagramUser = "collate.test";
const Post = require('../src/Models/Post');
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

ig.state.generateDevice(InstagramUser);

async function main() {
    // Execute all requests prior to authorization in the real Android application
    // Not required but recommended
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(InstagramUser, InstagramPass);
    // The same as preLoginFlow()
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    process.nextTick(async () => await ig.simulate.postLoginFlow());

    // Create UserFeed instance to get loggedInUser's posts
    const natGeo = await ig.user.getIdByUsername("natgeo");
    const userFeed = ig.feed.user(natGeo);
    let count = 0;
    let page = await userFeed.items();
    while (page) {
        count += page.length;
        console.log(count);
        await Promise.all(page.map(async (post) => {
            if (post.media_type === 8) {
                const doc = new Post({
                    type: "INSTAGRAM",
                    timeCreated: new Date(post.taken_at * 1000),
                    userId: "5fb8bbc454bea9493253f481",
                    instagram: {
                        id: post.id,
                        takenAt: new Date(post.taken_at * 1000),
                        likes: post.like_count,
                        caption: getCaption(post),
                        media: post.carousel_media.map((slide) => {
                            return {
                                type: "IMAGE",
                                url: slide.image_versions2.candidates[0].url
                            }
                        }),
                        thumbnail: {
                            type: "IMAGE",
                            url: post.carousel_media[0].image_versions2.candidates[0].url
                        }
                    }
                });
                return doc.save();
            } else if (post.media_type === 2) {
                const doc = new Post({
                    type: "INSTAGRAM",
                    timeCreated: new Date(post.taken_at * 1000),
                    userId: "5fb8bbc454bea9493253f481",
                    instagram: {
                        id: post.id,
                        takenAt: new Date(post.taken_at * 1000),
                        likes: post.like_count,
                        caption: getCaption(post),
                        media: [
                            {
                                type: "VIDEO",
                                url: post.video_versions[0].url
                            }
                        ],
                        thumbnail: {
                            type: "IMAGE",
                            url: post.image_versions2.candidates[0].url
                        }
                    }
                });
                return doc.save();
            } else {
                const doc = new Post({
                    type: "INSTAGRAM",
                    timeCreated: new Date(post.taken_at * 1000),
                    userId: "5fb8bbc454bea9493253f481",
                    instagram: {
                        id: post.id,
                        takenAt: new Date(post.taken_at * 1000),
                        likes: post.like_count,
                        caption: getCaption(post),
                        media: [
                            {
                                type: "IMAGE",
                                url: post.image_versions2.candidates[0].url
                            }
                        ],
                        thumbnail: {
                            type: "IMAGE",
                            url: post.image_versions2.candidates[0].url
                        }
                    }
                });
                return doc.save();
            }
        }));
        page = await userFeed.items();
        await wait(5000 + Math.random() * 500);
    }
}

function getCaption(post) {
    if (post.caption) {
        return post.caption.text
    }
    return "";
}

async function wait(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}