require("dotenv").config();
const IgApiClient = require("instagram-private-api").IgApiClient;
const ig = new IgApiClient();
const InstagramPass = "#K6qC3E4K6D%%mgCn";
const InstagramUser = "collate.test";
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(async () => {
        await main();
        console.log("done");
        mongoose.disconnect();
    })
    .catch((err) => {
        console.log(err);
    });

ig.state.generateDevice(InstagramUser);

async function main() {
    // Execute all requests prior to authorization in the real Android application
    // Not required but recommended
    await ig.simulate.preLoginFlow();
    await ig.account.login(InstagramUser, InstagramPass);
    // The same as preLoginFlow()
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    process.nextTick(async () => await ig.simulate.postLoginFlow());

    // Create UserFeed instance to get loggedInUser's posts
    const natGeo = await ig.user.getIdByUsername("natgeo");
    const userFeed = ig.feed.user(natGeo);
    const post = (await userFeed.items())[0];
    const commentsFeed = await ig.feed.mediaComments("2465742536960121158_427553890");
    let items = await commentsFeed.items();
    console.log(items[0].pk);
    items = await commentsFeed.items();
    console.log(items[0].pk);
    // console.log(commentsFeed);
    commentsFeed.state = {
        next_min_id:
            '{"cached_comments_cursor": "17872341170213290", "bifilter_token": "KKEBAIevje5niD8ATqJNKnOcPwBQklZtBoY_ANLal5wQnj8AE5SucqiYPwDTWefrdDFAAFKTPebxuj8AHNhOdxuCPwAdQub3fY4_AB7A9H1egz8AHq1zyKbEPwBfx8uYeS1AACUwGIB_uj8AaoJYHZqMPwDuMdZ7rI4_ADA1Ga7ziz8AcvtRP6CgQAB4qbViqKY_AHpicaOkM0AAfD_7wUmRPwAA"}'
    };
    items = await commentsFeed.items();
    console.log(items[0].pk);
}
