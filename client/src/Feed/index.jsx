import React from "react";
import Post from "./Post";
import "./index.css";
import { Link } from "react-router-dom";

export default function Feed(props) {
    return (
        <div className="feed">
            <h1 className="feed-title">Feed</h1>
            <div className="feed-login">
                <Link to="/signup">Sign up</Link>
                <Link to="/login">Login</Link>
            </div>
            {
                props.feed.map((post, i) => {
                    return <Post key={i} post={post} />
                })
            }
        </div>
    )
}