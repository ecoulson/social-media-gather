import mongoose from "mongoose";
import IPostDocument from "./IPostDocument";

const { Schema } = mongoose;

const InstagramMedia = new Schema({
    url: String,
    type: String
});

const TwitterUrls = new Schema({
    displayUrl: String,
    url: String,
    expandedUrl: String
});

const TwitterUserMentions = new Schema({
    screenName: String,
    id: String
});

const TwitterMedia = new Schema({
    type: String,
    id: String,
    thumbnailUrl: String,
    url: String
});

const schema = new Schema({
    type: {
        type: String,
        enum: ["TWITCH_STREAM", "TWITCH_VIDEO", "YOUTUBE_VIDEO", "TWEET", "INSTAGRAM"],
        required: true
    },
    timeCreated: Date,
    channelId: String,
    creatorId: String,
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
        viewers: Number
    },
    twitchVideo: {
        url: String,
        gameName: String,
        publishedAt: Date,
        title: String,
        description: String,
        thumbnailUrl: String,
        userName: String,
        views: Number
    },
    youtubeVideo: {
        publishedAt: Date,
        thumbnailUrl: String,
        title: String,
        videoId: String,
        likes: Number,
        dislikes: Number,
        views: Number,
        commentCount: Number,
        commentPageToken: String
    },
    tweet: {
        id: String,
        text: String,
        publishedAt: Date,
        screenName: String,
        favorites: Number,
        commentCount: Number,
        retweetCount: Number,
        hashtags: [String],
        urls: [TwitterUrls],
        userMentions: [TwitterUserMentions],
        media: [TwitterMedia]
    },
    instagram: {
        takenAt: Date,
        id: String,
        likes: String,
        commentCount: Number,
        commentCursor: String,
        caption: String,
        media: [InstagramMedia],
        thumbnail: InstagramMedia
    }
});

export default mongoose.model<IPostDocument>("Post", schema);
