import React from "react";
import Axios from "axios";
import { useState } from "react";
import Feed from "../Feed";
import { useEffect } from "react";

export default function FeedFetcher() {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        Axios.get("/api/feed").then((response) => setFeed(response.data))
    }, []);
    
    return (
        <Feed feed={feed} />
    );
}