require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios").default;
// const path = require("path");
// const fs = require("fs");
const { google } = require("googleapis");

const posts = [];
const InstagramURL = "https://graph.instagram.com"
const TwitterURl = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=adaptsolutions1";
const TestToken = "IGQVJYUnN4YU5GYVRnOERhLTlJVHNQcjFjQ2xFMFpGQm9vRDg3YmRDX2t5RDJNTmZABTWpuWHpuazQxUWF1THpMMzZA6YU9rSXk5ZADNsbFFJSWM0OFJobU1qbkRqTFo1UUxXZADg1UUJYMXJRTWVER3BDYURaXzZAiWTE4blpR";
// const scopes = ["https://www.googleapis.com/auth/youtube.readonly"];
// const tokenDirectory = process.env.YOUTUBE_CREDENTIAL_PATH;
// const tokenPath = path.join(tokenDirectory, "credentials.json");

// fs.readFile('client_secret.json')

app.get("/", (req, res) => {
    res.json(posts);
})

async function clock() {
    await Promise.all([
        getInstagramData(),
        getTwitterData(),
        getYouTubeData()
    ])
    sortFeed(posts);
};

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
    let userMediaRes = await axios.get(`${InstagramURL}/me/media?fields=permalink,thumbnail_url,usernameid,caption,media_type,media_url,username,timestamp&access_token=${TestToken}`);
    posts.push(...userMediaRes.data.data.map((post) => {
        return {
            type: "instagram",
            data: post
        }
    }));
    if (userMediaRes.data.paging.next) {
        console.log("Unimplemented");
    }
}

async function getYouTubeData() {
    const service = google.youtube('v3');
    return new Promise((resolve, reject) => {
        service.channels.list({
            auth: process.env.YOUTUBE_API_KEY,
            part: 'snippet,contentDetails,statistics',
            forUsername: 'PewDiePie'
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

function sortFeed(posts) {
    posts.sort((a, b) => {
        const dateA = getDate(a);
        const dateB = getDate(b);
        return dateB - dateA;
    })
}

function getDate(post) {
    switch (post.type) {
        case "twitter":
            return new Date(post.data.created_at);
        case "instagram":
            return new Date(post.data.timestamp);
        case "youtube":
            return new Date(post.data.snippet.publishedAt);
    }
}

app.listen(8080, () => {
    clock();
    setInterval(clock, 1000 * 60);
    console.log("Server is listening on 8080");
})