import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { ReactComponent as YouTube } from "./youtube.svg";
import { ReactComponent as Play } from "./play.svg";
import "./index.css";

export default function YouTubeVideo(props) {
    const [isLoaded, load] = useState(false);
    
    return (
        <div className="youtube-container">
            <div className="youtube-header">
                <YouTube className="youtube-header-logo" />
                <h2 className="youtube-header-title">{getTitle(props.post.data.snippet.title)}</h2>
                <span className="youtube-header-viewers">{new Date(props.post.data.snippet.publishedAt).toDateString()}</span>
            </div>
            {
                isLoaded ? 
                    renderVideo(props.post.data) : 
                    renderThumbnail(props.post.data, load)
            }
        </div>
    )
}

function renderThumbnail(post, load) {
    const imageUrl = post.snippet.thumbnails.standard.url;
    return (
        <div onClick={load} className="youtube-thumbnail">
            <img alt="video thumbnail" className="youtube-thumbnail-image" src={imageUrl} />
            <div className="youtube-overlay" />
            <Play className="youtube-play" />
        </div>
    )
}

function renderVideo(post) {
    return <ReactPlayer playing controls url={`https://www.youtube.com/watch?v=${post.contentDetails.videoId}`} />
}

function getTitle(title) {
    return title.length > 30 ?
        title.substring(0, 30) + "..." :
        title;
}