require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios").default;
const { google } = require("googleapis");
const Routes = require("./src/");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const path = require("path");

const posts = [];
const InstagramURL = "https://graph.instagram.com"
const TwitterURl = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=LeagueOfLegends";
const InstagramTestToken = "IGQVJYVklMR0FGajM4dWNJVzNZAd3UwSm5rcFlwajFiY3VUWkhjVlV1YXozNWJVbmtTaGVHV1BVTTQ4ZAjU2ZAV9tVjh2ZA0xDSXg3SmFwejVKUTRFX2VYUGw1M19rdmpvUlg4QnUxeG80a3R3QVI3dTdmZAgZDZD";
const FacebookTestToken = "EAADI2kYwctIBANHgpWojU6wfukFymXgpKa1yJDjttba3xxdyb1I9Wmw6vkZCaBZCv9RLsE9KtfWl10MGnaeSA90WH9nJuqkFMkBPEITSeEZAOWsljiOa0gG1LonyubJW1rCpyLBxdq2NqKAqkIIPODKxJCeCPhYThbYHFMSYgZDZD";

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("connected to db")
}).catch(() => {
    console.log("failed to connect to db")
});

app.use(morgan('dev'));
app.use(bodyParser.json())

app.use(Routes);

app.use("/", express.static(path.join(__dirname, '..', 'client', 'build')));

app.get("/api/feed_old", (req, res) => {
    res.json(posts);
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

async function getTwitterData() {
    let tweets = await axios.get(TwitterURl, {
        headers: {
            "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    });
    posts.push(...tweets.data.map((tweet) => { 
        return {
            type: "twitter", 
            data: tweet 
        } 
    }));
}

async function getInstagramData() {
    try {
        let userMediaRes = await axios.get(`${InstagramURL}/me/media?fields=permalink,thumbnail_url,usernameid,caption,media_type,media_url,username,timestamp&access_token=${InstagramTestToken}`);
        posts.push(...userMediaRes.data.data.map((post) => {
            return {
                type: "instagram",
                data: post
            }
        }));
        if (userMediaRes.data.paging.next) {
            console.log("Unimplemented");
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

async function getYouTubeData() {
    const service = google.youtube('v3');
    return new Promise((resolve, reject) => {
        service.channels.list({
            auth: process.env.YOUTUBE_API_KEY,
            part: 'snippet,contentDetails,statistics',
            forUsername: 'ESPN'
        }, function (err, response) {
            if (err) {
                return reject(err);
            }
            service.playlistItems.list({
                part: "contentDetails,id,snippet,status",
                auth: process.env.YOUTUBE_API_KEY,
                playlistId: response.data.items[0].contentDetails.relatedPlaylists.uploads
            }, (err, playlistItems) => {
                if (err) {
                    return reject(err);
                }
                posts.push(...playlistItems.data.items.map((video) => {
                    return {
                        type: "youtube",
                        data: video
                    }
                }))
                resolve();
            })
        })
    })
}

async function getFacebookData() {
    const response = await axios.get("https://graph.facebook.com/v8.0/me/posts", {
        headers: {
            Authorization: `Bearer ${FacebookTestToken}`
        }
    })
    let facebookPosts = await Promise.all(response.data.data.map(async (post) => {
        return {
            ...post,
            attachments: (await axios.get(`https://graph.facebook.com/v8.0/${post.id}/attachments`, {
                headers: {
                    Authorization: `Bearer ${FacebookTestToken}`
                }
            })).data.data
        }
    }));
    facebookPosts = facebookPosts.map((post) => {
        return {
            type: "facebook_post",
            data: post
        }
    });
    posts.push(...facebookPosts);
}

app.listen(process.env.PORT, () => {
    console.log("Server is listening on 8080");
})