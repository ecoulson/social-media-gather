import React from "react";
import { ReactComponent as InstagramLogo } from "./instagram.svg";
import "./index.css";

export default function Instagram(props) {
    console.log(props.post);
    return (
        <div className="instagram-container">
            <div className="instagram-header">
                <InstagramLogo className="instagram-header-logo" />
                <span className="instagram-header-date">
                    {new Date(props.post.data.timestamp).toDateString()}
                </span>
            </div>
            <img className="instgram-media" src={props.post.data.media_url} />
        </div>
    )
} 