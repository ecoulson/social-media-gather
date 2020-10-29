import React, { useRef, useCallback } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { ReactComponent as YouTube } from "../../../Assets/youtube.svg";
import { ReactComponent as Play } from "../../../Assets/play.svg";
import "./index.css";

export default function YouTubeVideo(props) {
    const [isLoaded, load] = useState(false);
    const [ref, setRef] = useState(null);

    const onRefChange = useCallback(node => {
        // ref value changed to node
        setRef(node); // e.g. change ref state to trigger re-render
        if (node === null) { 
        // node is null, if DOM node of ref had been unmounted before
        } else {
            setTimeout(() => {
                const height = node.querySelector(".youtube-thumbnail-image").clientHeight;
                node.style.height = height + "px";
            }, 1000)
        }
    }, []);

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
                    renderThumbnail(props.post, load, onRefChange)
            }
        </div>
    )
}

function renderThumbnail(post, load, onRefChange) {
    const imageUrl = post.thumbnailUrl;
    return (
        <div ref={onRefChange} onClick={load} className="youtube-thumbnail">
            <img alt="video thumbnail" className="youtube-thumbnail-image" src={imageUrl} />
            <div className="youtube-overlay" />
            <Play className="youtube-play" />
        </div>
    )
}

function renderVideo(post) {
    return <ReactPlayer className="youtube-player" playing controls url={`https://www.youtube.com/watch?v=${post.videoId}`} />
}

function getTitle(title) {
    return title.length > 30 ?
        title.substring(0, 30) + "..." :
        title;
}