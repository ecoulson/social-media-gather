import React, { useRef } from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import debounce from "../Library/debounce";
import transformFeed from "./FeedTransformer";

export default function FeedFetcher({ feedUrl, Component }) {
    const scrollRef = useRef(null);
    const [feed, setFeed] = useState([]);
    const [originalHeight, setHeight] = useState(0);
    const [index, setIndex] = useState(0);
    
    
    const onScroll = debounce(() => {
        const height = getContainerHeight(scrollRef.current);
        if (scrollRef.current.scrollTop + scrollRef.current.clientHeight + originalHeight > height - 500) {
            setIndex(index => index + 20);
            getFeed();
        }            
    }, 250)

    useEffect(() => {
        scrollRef.current.addEventListener("scroll", onScroll)
        return function cleanup() {
            scrollRef.current.removeEventListener("scroll", onScroll)
        }
    }, [onScroll])

    async function getFeed() {
        const response = await Axios.get(`${feedUrl}?offset=${index}`);
        console.log(response.data);
        setFeed([...feed, ...response.data.data.posts]);
    }

    useEffect(() => {
        getFeed();
        setHeight(getContainerHeight(scrollRef.current));
    }, [])
    
    useEffect(() => {
        setIndex(0);
        setFeed([]);
        setHeight(getContainerHeight(scrollRef.current));
    }, [feedUrl])

    useEffect(() => {
        if (feed === []) {
            getFeed();
        }
    }, [feed])
    
    return <Component scrollRef={scrollRef} posts={transformFeed(feed)}/>
}

function getContainerHeight(element) {
    return Math.max(element.scrollHeight, element.offsetHeight)
}