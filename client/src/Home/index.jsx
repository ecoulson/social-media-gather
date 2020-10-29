import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import isAuthenticated from "../Auth/IsAuthenticated";
import FeedFetcher from "../FeedFetcher";
import Cookie from "../Library/Cookie";
import Logo from "../Logo";
import SearchBar from "../SearchBar";
import "./index.css";

export default function Home() {
    const [isFollowing, setFollowing] = useState(true);
    const history = useHistory();

    useEffect(() => {
        async function checkAuthenticated() {
            if (!(await isAuthenticated())) {
                history.push('/login')
            } else {
                getAuthenticatedUser();
            }
        }

        async function getAuthenticatedUser() {
            try {
                const response = await Axios.get("/api/auth/me", {
                    headers: {
                        authorization: `Bearer ${Cookie.getCookie("token")}`
                    }
                });
                const me = response.data;
                console.log(me);
                setFollowing(me.following.length > 1);
            } catch (error) {
                console.log("failed to get authenticated user")
            }
        }

        checkAuthenticated();
    }, [])

    function renderFeed() {
        if (!isFollowing) {
            return <div className="startup-message-container">
                <Logo id="startup-message-logo" simple />
                <p id="startup-message-top" className="startup-message">Use the search bar to look for your favorite content creators.</p>
                <p id="startup-message-bottom" className="startup-message">Start following them to build your feed!</p>
                <SearchBar />
            </div>
        }
        return <FeedFetcher feedUrl="/api/feed" />
    }

    return (
        <>
            {renderFeed()}
        </>
    )
}