import React from "react";
import { ReactComponent as Twitter } from "../../../Assets/twitter.svg";
import "./index.css";

export default function TwitterPost(props) {
    return (
        <div className="twitter-post-container">
            <div className="twitter-header">
                <Twitter className="twitter-header-logo" />
                <span className="twitter-header-date">
                    {new Date(props.post.data.created_at).toDateString()}
                </span>
            </div>
            <div className="tweet">{props.post.data.text}</div>
            <div className="tweet">@{props.post.data.user.screen_name}</div>
        </div>
    )
} 