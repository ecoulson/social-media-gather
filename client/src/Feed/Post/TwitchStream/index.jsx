import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player"
import { ReactComponent as Twitch } from "./twitch.svg";
import { ReactComponent as Play } from "./play.svg";
import "./index.css";

export default function TwitchStream(props) {
    const [isLoaded, load] = useState(false);
    
    return (
        <div className="twitch-stream-container">
            <div className="twitch-stream-header">
                <Twitch className="twitch-stream-header-logo" />
                <h2 className="twitch-stream-header-title">{getTitle(props.post.data.title)}</h2>
                <span className="twitch-stream-header-viewers">Viewers: {getViews(props.post.data)}</span>
            </div>
            {
                isLoaded ? 
                    renderStream(props.post.data) : 
                    renderStreamThumbnail(props.post.data, load)
            }
        </div>
    )
}

function getViews(post) {
    if (post.viewer_count > 1000000000) {
        return (post.viewer_count / 1000000000).toFixed(1) + "B"
    }
    if (post.viewer_count > 1000000) {
        return (post.viewer_count / 1000000).toFixed(1) + "M"
    }
    if (post.viewer_count > 1000) {
        return (post.viewer_count / 1000).toFixed(1) + "K"
    }
    return post.viewer_count;
}

function getTitle(title) {
    return title.length > 30 ?
        title.substring(0, 30) + "..." :
        title;
}

function renderStreamThumbnail(post, load) {
    let imageUrl = post.thumbnail_url.replace("{width}", 640).replace("{height}", 360);
    return (
        <div onClick={load} className="twitch-stream-thumbnail">
            <img className="twitch-stream-thumbnail-image" src={imageUrl} />
            <div className="twitch-stream-overlay" />
            <span className="twitch-stream-live">Live</span>
            <Play className="twitch-stream-play" />
        </div>
    )
}

function renderStream(post) {
    return <ReactPlayer 
                controls 
                playing={true}
                url={`https://www.twitch.tv/${post.user_name}`} />
}