import React from "react";
import Axios from "axios";
import { useState } from "react";
import Feed from "../Feed";
import { useEffect } from "react";
import debounce from "../Library/debounce";

export default function FeedFetcher(props) {
    const body = document.body;
    const html = document.documentElement;
    const [feed, setFeed] = useState([]);
    const [originalHeight, setHeight] = useState(0);
    const [index, setIndex] = useState(0);
    console.log(props.feedUrl);

    const onScroll = debounce(() => {
        const height = getDocumentHeight(body, html);
        if (window.scrollY + originalHeight > height - 500) {
            setIndex(index => index + 20);
            getFeed();
        }            
    }, 250)

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return function cleanup() {
            window.removeEventListener("scroll", onScroll)
        }
    }, [onScroll])

    async function getFeed() {
        const response = await Axios.get(`${props.feedUrl}?offset=${index}`);
        console.log(response);
        setFeed([...feed, ...response.data]);
    }

    useEffect(() => {
        getFeed();
        setHeight(getDocumentHeight(body, html));
    }, [])
    
    useEffect(() => {
        setIndex(0);
        setFeed([]);
        setHeight(getDocumentHeight(body,html));
    }, [props.feedUrl])

    useEffect(() => {
        if (feed === []) {
            getFeed();
        }
    }, [feed])

    return (
        <>
            <Feed feed={feed} />
        </>
    );
}

function getDocumentHeight(body, html) {
    return Math.max(body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight)
}