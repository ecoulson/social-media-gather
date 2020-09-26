import React from "react";
import Axios from "axios";
import { useState } from "react";
import Feed from "../Feed";
import { useEffect } from "react";
import debounce from "../Library/debounce";

export default function FeedFetcher() {
    const body = document.body;
    const html = document.documentElement;
    const originalHeight = getDocumentHeight(body, html)
    const [feed, setFeed] = useState([]);
    const [index, setIndex] = useState(0)

    const onScroll = debounce(() => {
        const height = getDocumentHeight(body, html);
        if (window.scrollY + originalHeight > height - height / 3) {
            setIndex(index => index + 20);
        }            
    }, 250)

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return function cleanup() {
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    useEffect(() => {
        Axios.get(`/api/feed?offset=${index}`).then((response) => {
            setFeed([...feed, ...response.data])
        })
    }, [index]);
    
    return [
        <Feed feed={feed} />,
        <div>{index}</div>   
    ];
}

function getDocumentHeight(body, html) {
    return Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight )
}