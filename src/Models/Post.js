const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
    type: {
        type: String,
        enum: ["TWITCH_STREAM", "TWITCH_VIDEO"],
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
    }
})

module.exports = mongoose.model("Post", schema);