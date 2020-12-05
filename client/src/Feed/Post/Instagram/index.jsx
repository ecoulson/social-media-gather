import React from "react";
import { ReactComponent as InstagramLogo } from "../../../Assets/instagram.svg";
import "./index.css";

export default function Instagram(props) {
    function renderMedia() {
        if (props.post.media.length === 1) {
            return props.post.media[0].type === "IMAGE" ?
            renderImage(props.post.media[0].url, 1) : renderVideo(props.post.media[0].url, 1);
        } else {
            return props.post.media.map((media, i) => {
                return media.type === "IMAGE" ?
                    renderImage(media.url, i) : renderVideo(media.url, i);
            })
        }
    }

    function renderImage(url, key) {
        return <img key={key} alt="instagram post" className="instgram-media" src={url} />
    }

    function renderVideo(url, key) {
        return (
            <video key={key} alt="instagram post" controls className="instgram-media">
                <source src={url} type="video/mp4" />
            </video>
        )
    }
    return (
        <div className="instagram-container">
            <div className="instagram-header">
                <InstagramLogo className="instagram-header-logo" />
                <span className="instagram-header-date">
                    {new Date(props.post.takenAt).toDateString()}
                </span>
            </div>
            {renderMedia()}
            <span>{props.post.likes} Likes</span>
            <p>{props.post.caption}</p>
        </div>
    )
} 