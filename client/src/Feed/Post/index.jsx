import React from "react";
import TwitchStream from "./TwitchStream";
import TwitchVideo from "./TwitchVideo";
import "./index.css";
import Instagram from "./Instagram";
import FacebookPost from "./FacebookPost";
import YouTubeVideo from "./YoutubeVideo";
import TwitterPost from "./TwitterPost";

export default function Post(props) {
    return (
        <div className="post">
            {getRender(props.post)}
        </div>
    )
}

function getRender(post) {
    switch (post.type.toLowerCase()) {
        case "twitch_stream":
            return <TwitchStream post={post.twitchStream} />
        case "twitch_video":
            return <TwitchVideo post={post.twitchVideo} />
        case "instagram":
            return <Instagram post={post.instagram} />
        case "facebook_post":
            return <FacebookPost post={post} />
        case "youtube_video":
            return <YouTubeVideo post={post.youtubeVideo} />
        case "tweet":
            return <TwitterPost post={post.tweet} />
        default:
            return <div>Unknown post type</div>
    }
}