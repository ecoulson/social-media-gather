require("dotenv").config();
const puppeteer = require('puppeteer');
const InstagramPass = "#K6qC3E4K6D%%mgCn";
const InstagramUser = "collate.test";
const mongoose = require("mongoose");
const User = require("../src/Models/User");
const Post = require('../src/Models/Post');

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(async () => {
    await main();
    mongoose.disconnect();
}).catch((e) => {
    console.log(e)
});


async function wait(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/accounts/login/');
    await wait(1000);
    await page.type("form div div:nth-child(1) input", InstagramUser);
    await page.type("form div div:nth-child(2) input", InstagramPass);
    await page.click("form div div:nth-child(3) button");
    await wait(3000);
    await page.goto('https://www.instagram.com/natgeo/');
    
    const data = {};
    data.profile = JSON.parse(await page.evaluate(
        () => JSON.stringify(window._sharedData.entry_data.ProfilePage[0].graphql)
    ));

    const extractItems = () => {
        let postUrls = [];
        let article = document.querySelectorAll('article');
        let rowContainer = article[0].children[0].children[0];
        rowContainer.childNodes.forEach((row) => {
            row.childNodes.forEach((postElement) => {
                const aTag = postElement.querySelector("a");
                postUrls.push(aTag.href);
            })
        });
        return postUrls;
    }

    let postUrls = [];

    while (postUrls.length < 10) {
        postUrls = await page.evaluate(extractItems);
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await page.waitForTimeout(1000 + Math.random() * 1000);
    }

    const posts = [];

    while (postUrls.length != 0) {
        await page.goto(postUrls.shift());
        const post = await page.evaluate(async () => {
            async function wait(time) {
                return new Promise((resolve) => {
                    setTimeout(resolve, time);
                })
            }

            function getLikes() {
                if (document.querySelector("article div section div span span")) {
                    return document.querySelector("article div section div span span").textContent;
                } else {
                    return document.querySelector("article div:nth-child(4) section:nth-child(2) div div button span").textContent;
                }
            }

            if (document.querySelector(".coreSpriteRightChevron")) {
                const sideCar = {
                    likes: getLikes(),
                    takenAt: document.querySelector("article div div a time").getAttribute("datetime"),
                    caption: document.querySelector("article div div ul div li div div div:nth-child(2) span:nth-child(2)").textContent,
                    media: []
                };
                let index = 0;
                while (document.querySelector(".coreSpriteRightChevron")) {
                    const loaded = document.querySelectorAll(`article div div div div div div div ul li`)[
                        index === 0 ? 1 : 2
                    ];
                    let image = loaded.querySelector("img");
                    let video = loaded.querySelector("video");
                    if (image) {
                        sideCar.media.push({
                            type: "IMAGE",
                            url: image.src
                        });
                    } else {
                        sideCar.media.push({
                            type: "VIDEO",
                            url: video.src
                        });
                    }
                    let element = document.querySelector(".coreSpriteRightChevron");
                    element.click();
                    index++;
                    await wait(500);
                }
                const loaded = document.querySelectorAll(`article div div div div div div div ul li`)[
                    index === 0 ? 1 : 2
                ];
                let image = loaded.querySelector("img");
                let video = loaded.querySelector("video");
                if (image) {
                    sideCar.media.push({
                        type: "IMAGE",
                        url: image.src
                    });
                } else {
                    sideCar.media.push({
                        type: "VIDEO",
                        url: video.src
                    });
                }
                return sideCar;
            } else if (document.querySelector("video")) {
                return {
                    likes: getLikes(),
                    takenAt: document.querySelector("article div div a time").getAttribute("datetime"),
                    caption: document.querySelector("article div div ul div li div div div:nth-child(2) span:nth-child(2)").textContent,
                    media: [
                        {
                            url: document.querySelector(`video`).src,
                            type: "VIDEO"
                        }
                    ]
                }
            } else {
                return {
                    likes: getLikes(),
                    takenAt: document.querySelector("article div div a time").getAttribute("datetime"),
                    caption: document.querySelector("article div div ul div li div div div:nth-child(2) span:nth-child(2)").textContent,
                    media: [
                        {
                            url: document.querySelector(`article div div div div img`).src,
                            type: "IMAGE"
                        }
                    ]
                }
            }
        }); 
        posts.push(post);
        await await page.waitForTimeout(1000 + Math.random() * 1000);
    }

    const user = await User.findOne({ username: "NatGeo" });
    posts.forEach(async (post) => {
        console.log(post);
        const postDoc = new Post({
            type: "INSTAGRAM",
            timeCreated: post.takenAt,
            userId: user.id,
            instagram: post
        });
        await postDoc.save();
    });
}