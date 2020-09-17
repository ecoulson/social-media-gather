import React from "react";
import { ReactComponent as Facebook } from "./facebook.svg";
import "./index.css";

export default function FacebookPost(props) {
    console.log(props);
    return (
        <div className="facebook-post-container">
            <div className="facebook-post-header">
                <Facebook className="facebook-post-header-logo" />
                <span className="facebook-post-header-date">{new Date(props.post.data.created_time).toDateString()}</span>
            </div>
            <div className="facebook-post-message">{renderMessage(props.post.data)}</div>
            <div className="facebook-post-attachment">{renderAttachments(props.post.data)}</div>
        </div>
    )
}

function renderMessage(post) {
    if (post.attachments.length === 1 && post.attachments[0].type === "profile_media") {
        return `${post.attachments[0].title} has updated their profile picture!`
    }
    return post.message ? post.message : "";
}

function renderAttachments(post) {
    return <img className="facebook-post-attachment-media" src={post.attachments[0].media.image.src} />;
}