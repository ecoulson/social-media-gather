import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { ReactComponent as YouTube } from "../../../Assets/youtube.svg";
import { ReactComponent as Play } from "../../../Assets/play.svg";
import "./index.css";

export default function YouTubeVideo(props) {
    const [isLoaded, load] = useState(false);
    
    return (
        <div className="youtube-container">
            <div className="youtube-header">
                <YouTube className="youtube-header-logo" />
                <h2 className="youtube-header-title">{getTitle(props.post.title)}</h2>
                <span className="youtube-header-viewers">{new Date(props.post.publishedAt).toDateString()}</span>
            </div>
            {
                isLoaded ? 
                    renderVideo(props.post) : 
                    renderThumbnail(props.post, load)
            }
        </div>
    )
}

function renderThumbnail(post, load) {
    const imageUrl = post.thumbnailUrl;
    return (
        <div onClick={load} className="youtube-thumbnail">
            <img alt="video thumbnail" className="youtube-thumbnail-image" src={imageUrl} />
            <div className="youtube-overlay" />
            <Play className="youtube-play" />
        </div>
    )
}

function renderVideo(post) {
    return <ReactPlayer playing controls url={`https://www.youtube.com/watch?v=${post.videoId}`} />
}

function getTitle(title) {
    return title.length > 30 ?
        title.substring(0, 30) + "..." :
        title;
}