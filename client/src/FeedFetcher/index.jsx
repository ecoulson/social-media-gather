import React from "react";
import Axios from "axios";
import { useState } from "react";
import Feed from "../Feed";
import { useEffect } from "react";
import debounce from "../Library/debounce";

export default function FeedFetcher(props) {
    const body = document.body;
    const html = document.documentElement;
    const originalHeight = getDocumentHeight(body, html)
    const [feed, setFeed] = useState([]);
    const [index, setIndex] = useState(0);
    const [reload, setReload] = useState(false);

    const onScroll = debounce(() => {
        const height = getDocumentHeight(body, html);
        if (window.scrollY + originalHeight > height - 2000) {
            setIndex(index => index + 20);
        }            
    }, 250)

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return function cleanup() {
            window.removeEventListener("scroll", onScroll)
        }
    }, [onScroll])

    useEffect(() => {
        async function getFeed() {
            const response = await Axios.get(`${props.feedUrl}?offset=${index}`);
            setFeed([...feed, ...response.data]);
        }

        if (reload) {
            setIndex(0);
            setFeed([]);
            setReload(false);
        } else {
            getFeed();
        }
    }, [index, reload]);

    useEffect(() => {
        setReload(true);
    }, [props.feedUrl])
    
    return <Feed feed={feed} />
}

function getDocumentHeight(body, html) {
    return Math.max(body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight)
}