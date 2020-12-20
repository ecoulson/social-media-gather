import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    twitterId: String,
    youtubeId: String,
    twitchId: String,
    instagramId: String,
    email: String,
    password: String,
    username: String,
    verified: Boolean,
    following: {
        type: [String],
        default: []
    }
})

UserSchema.index({ username: "text" });

export default mongoose.model("User", UserSchema);