const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
    type: {
        type: String,
        enum: ["TWITCH_STREAM", "TWITCH_VIDEO", "YOUTUBE_VIDEO"],
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
    }
})

module.exports = mongoose.model("Post", schema);