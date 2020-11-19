const mongoose = require("mongoose");

const { Schema } = mongoose;

const TwitterUrls = new Schema({
    displayUrl: String,
    url: String,
    expandedUrl: String,
})

const TwitterUserMentions = new Schema({
    screenName: String,
    id: String,
})

const TwitterMedia = new Schema({
    type: String,
    id: String,
    thumbnailUrl: String,
    url: String
})

const schema = new Schema({
    type: {
        type: String,
        enum: ["TWITCH_STREAM", "TWITCH_VIDEO", "YOUTUBE_VIDEO", "TWEET"],
        required: true
    },
    timeCreated: Date,
    userId: String,
    twitchStream: {
        url: String,
        live: Boolean,
        gameName: String,
        startedAt: Date,
        endedAt: Date,
        userName: String,
        thumbnailUrl: String,
        title: String,
        streamId: String,
    },
    twitchVideo: {
        url: String,
        gameName: String,
        publishedAt: Date,
        title: String,
        description: String,
        thumbnailUrl: String,
        userName: String,
    },
    youtubeVideo: {
        publishedAt: Date,
        thumbnailUrl: String,
        title: String,
        videoId: String
    },
    tweet: {
        id: String,
        text: String,
        publishedAt:  Date,
        screenName: String,
        hashtags: [String],
        urls: [TwitterUrls],
        userMentions: [TwitterUserMentions],
        media: [TwitterMedia]
    }
})

module.exports = mongoose.model("Post", schema);