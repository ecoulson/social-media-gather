import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { ReactComponent as Twitch } from "./twitch.svg";
import { ReactComponent as Play } from "./play.svg";
import "./index.css";

export default function TwitchVideo(props) {
    const [isLoaded, load] = useState(false);

    if (props.post.data.thumbnail_url === "") {
        return null;
    }
    
    return (
        <div className="twitch-video-container">
            <div className="twitch-video-header">
                <Twitch className="twitch-video-header-logo" />
                <h2 className="twitch-video-header-title">{getTitle(props.post.data.title)}</h2>
                <span className="twitch-video-header-viewers">{new Date(props.post.data.published_at).toDateString()}</span>
            </div>
            {
                isLoaded ? 
                    renderVideo(props.post.data) : 
                    renderThumbnail(props.post.data, load)
            }
        </div>
    )
}

function getTitle(title) {
    return title.length > 30 ?
        title.substring(0, 30) + "..." :
        title;
}

function renderThumbnail(post, load) {
    let imageUrl = post.thumbnail_url.replace("%{width}", 640).replace("%{height}", 360);
    return (
        <div onClick={load} className="twitch-video-thumbnail">
            <img alt="video thumbnail" className="twitch-video-thumbnail-image" src={imageUrl} />
            <div className="twitch-video-overlay" />
            <Play className="twitch-video-play" />
        </div>
    )
}

function renderVideo(post) {
    return <ReactPlayer controls playing url={post.url} />
}
