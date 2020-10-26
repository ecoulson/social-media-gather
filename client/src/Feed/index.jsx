import React from "react";
import Post from "./Post";
import Loader from "../Loader";
import "./index.css";
import Panel from "../Panel";

export default function Feed(props) {
    if (props.feed.length === 0) {
        return (
            <div className="feed">
                <Loader />
            </div>
        );
    }

    return (
        <Panel className="feed">
            {
                props.feed.map((post, i) => {
                    return <Post key={i} post={post} />
                })
            }
        </Panel>
    )
}