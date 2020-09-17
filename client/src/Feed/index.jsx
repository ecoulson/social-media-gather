import React from "react";
import Post from "./Post";
import "./index.css";

export default function Feed(props) {
    return (
        <div className="feed">
            <h1 className="feed-title">Feed</h1>
            {
                props.feed.map((post, i) => {
                    return <Post key={i} post={post} />
                })
            }
        </div>
    )
}