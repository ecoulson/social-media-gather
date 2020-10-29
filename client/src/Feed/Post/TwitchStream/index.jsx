import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player"
import { ReactComponent as Twitch } from "../../../Assets/twitch.svg";
import { ReactComponent as Play } from "../../../Assets/play.svg";
import "./index.css";

export default function TwitchStream(props) {
    const [isLoaded, load] = useState(false);
    const [worldsMode, setWorldsMode] = useState(false);
    
    return (
        <div className="twitch-stream-container">
            <div className="twitch-stream-header">
                <Twitch className="twitch-stream-header-logo" />
                <h2 className="twitch-stream-header-title">{getTitle(props.post.title)}</h2>
                <span className="twitch-stream-header-viewers">{new Date().toDateString()}</span>
            </div>
            { renderContent(isLoaded, props.post, load, worldsMode, setWorldsMode) }
        </div>
    )
}

function getTitle(title) {
    return title.length > 25 ?
        title.substring(0, 25) + "..." :
        title;
}

function renderContent(isLoaded, post, load, worldsMode, setWorldsMode) {
    if (worldsMode) {
        return renderWorldsMode(post, setWorldsMode);
    }
    if (post.live) {
        return [
            isLoaded ?
                renderStream(post) :
                renderStreamThumbnail(post, load),
            post.gameName === "League of Legends" ?
                <button onClick={() => setWorldsMode(true)} className="twitch-stream-worlds-mode">Worlds Mode</button> :
                null    
        ]
    } else {
        return <div>{post.userName} finished streaming at {new Date(post.endedAt).toDateString()}</div>
    }
}

function renderWorldsMode(post, setWorldsMode) {
    return (
        <div className="worlds-mode-container">
            <button onClick={() => setWorldsMode(false)}>Close</button>
            <button>Audio Only</button>
            {renderStream(post)}
            <ReactPlayer 
                controls 
                muted={true}
                playing={true}
                url="https://www.twitch.tv/riotgames" />
        </div>
    )
}

function renderStreamThumbnail(post, load) {
    let imageUrl = post.thumbnailUrl.replace("{width}", 640).replace("{height}", 360);
    return (
        <div onClick={load} className="twitch-stream-thumbnail">
            <img alt="video thumbnail" className="twitch-stream-thumbnail-image" src={imageUrl} />
            <div className="twitch-stream-overlay" />
            <span className="twitch-stream-live">Live</span>
            <Play className="twitch-stream-play" />
        </div>
    )
}

function renderStream(post) {
    return <ReactPlayer 
                controls
                className="twitch-stream-player" 
                playing={true}
                url={post.url} />
}