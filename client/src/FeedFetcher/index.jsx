import React, { useCallback, useRef } from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import debounce from "../Library/debounce";
import transformFeed from "./FeedTransformer";
import GetUser from "../Library/GetUser";

export default function FeedFetcher({ feedUrl, Component }) {
  const scrollRef = useRef(null);
  const [feed, setFeed] = useState([]);
  const [index, setIndex] = useState(0);

  const getFeed = useCallback(async () => {
    const response = await Axios.get(`${feedUrl}?offset=${index}`);
    const posts = await Promise.all(
      response.data.data.posts.map(async (post) => {
        const creator = await GetUser(post.creatorId);
        post.channelName = creator.username;
        return post;
      })
    );
    console.log(posts[0]);
    setFeed((feed) => [...feed, ...posts]);
  }, [index, feedUrl]);

  const onScroll = debounce(() => {
    const height = getContainerHeight(scrollRef.current);
    if (
      scrollRef.current.scrollTop + scrollRef.current.clientHeight >
      height - 500
    ) {
      setIndex((index) => index + 20);
    }
  }, 250);

  useEffect(() => {
    console.log("Brother bilo", getContainerHeight(scrollRef.current));
    getFeed();
  }, [getFeed]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener("scroll", onScroll);
    return function cleanup() {
      scrollContainer.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    setIndex(0);
    setFeed([]);
  }, [feedUrl]);

  useEffect(() => {
    if (feed === []) {
      console.log("Brother bilo 2");
      getFeed();
    }
  }, [feed, getFeed]);

  return <Component scrollRef={scrollRef} posts={transformFeed(feed)} />;
}

function getContainerHeight(element) {
  return Math.max(element.scrollHeight, element.offsetHeight);
}
