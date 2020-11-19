const mongoose = require("mongoose");

const { Schema } = mongoose;

const WebhookSchema = new Schema({
    expirationDate: Date,
    dateCreated: {
        default: Date.now(),
        type: Date
    },
    platform: String,
    topicURL: String,
    callbackURL: String,
    userId: String,
    channelId: String,
})

module.exports = mongoose.model("Webhook", WebhookSchema);