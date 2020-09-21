const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    twitterId: String,
    youtubeId: String,
    twitchId: String,
    email: String
})

module.exports = mongoose.model("User", UserSchema);