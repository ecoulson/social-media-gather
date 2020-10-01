import React, { useEffect, useState } from "react";
import Post from "./Post";
import "./index.css";
import isAuthenticated from "../Auth/IsAuthenticated";
import { Link, useHistory } from "react-router-dom";

export default function Feed(props) {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuthentication() {
            if (!await isAuthenticated()) {
                history.push("/login")
                setAuthenticated(true)
            }
        }

        checkAuthentication();
    }, [])

    return (
        <div className="feed">
            <h1 className="feed-title">Feed</h1>
            <div className="feed-login">
                {authenticated ? 
                    <Link to="/login">Login</Link> :
                    <Link to="/logout">Logout</Link>
                }
            </div>
            {
                props.feed.map((post, i) => {
                    return <Post key={i} post={post} />
                })
            }
        </div>
    )
}