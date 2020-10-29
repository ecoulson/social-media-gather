import React from "react";
import { useState, useCallback } from "react";
import ReactPlayer from "react-player";
import { ReactComponent as Twitch } from "../../../Assets/twitch.svg";
import { ReactComponent as Play } from "../../../Assets/play.svg";
import "./index.css";

export default function TwitchVideo(props) {
    const [isLoaded, load] = useState(false);
    const [ref, setRef] = useState(null);

    const onRefChange = useCallback(node => {
        // ref value changed to node
        setRef(node); // e.g. change ref state to trigger re-render
        if (node === null) { 
        // node is null, if DOM node of ref had been unmounted before
        } else {
            setTimeout(() => {
                const height = node.querySelector(".twitch-video-thumbnail-image").clientHeight;
                node.style.height = height + "px";
            }, 1000)
        }
    }, []);

    if (props.post.thumbnailUrl === "") {
        return null;
    }
    
    return (
        <div className="twitch-video-container">
            <div className="twitch-video-header">
                <Twitch className="twitch-video-header-logo" />
                <h2 className="twitch-video-header-title">{getTitle(props.post.title)}</h2>
                <span className="twitch-video-header-viewers">{new Date(props.post.publishedAt).toDateString()}</span>
            </div>
            {
                isLoaded ? 
                    renderVideo(props.post) : 
                    renderThumbnail(props.post, load, onRefChange)
            }
        </div>
    )
}

function getTitle(title) {
    return title.length > 30 ?
        title.substring(0, 30) + "..." :
        title;
}

function renderThumbnail(post, load, onRefChange) {
    let imageUrl = post.thumbnailUrl.replace("%{width}", 640).replace("%{height}", 360);
    return (
        <div ref={onRefChange} onClick={load} className="twitch-video-thumbnail">
            <img alt="video thumbnail" className="twitch-video-thumbnail-image" src={imageUrl} />
            <div className="twitch-video-overlay" />
            <Play className="twitch-video-play" />
        </div>
    )
}

function renderVideo(post) {
    return <ReactPlayer className="twitch-video-player" controls playing url={post.url} />
}
