import { GridItem } from "@chakra-ui/react";
import Axios from "axios";
import React, { useCallback, useState } from "react";
import InfiniteScroll from "../InfiniteScroll";
import Cookie from "../Library/Cookie";
import transformFeed from "../Library/FeedTransformer";
import GetEndpoint from "../API/GetEndpoint";
import Feed from "./Feed";
import FollowedCreatorsSection from "./FollowedCreatorsSection";
import GetChannels from "./FollowedCreatorsSection/FollowedCreators/Creator/CreatorMedias/GetChannels";
import HomeLayout from "./HomeLayout";
import PostDisplay from "./PostDisplay";
import useAuth from "../Auth/useAuth";

export default function Home() {
  useAuth();
  const [currentPost, setPost] = useState(null);
  const [feed, setFeed] = useState([]);

  const getNext = useCallback(async (index) => {
    const response = await Axios.get(
      `${GetEndpoint()}/api/feed?offset=${index}`,
      {
        headers: {
          Authorization: `Bearer ${Cookie.getCookie("token")}`,
        },
      }
    );
    const channelIds = response.data.data.posts.map((post) => {
      return post.channelId;
    });
    const channels = await GetChannels(channelIds);
    const channelMap = new Map();
    channels.forEach((channel) => {
      channelMap.set(channel.id, channel);
    });
    let posts = response.data.data.posts.map((post) => {
      post.channelName = channelMap.get(post.channelId).name;
      return post;
    });
    posts = posts.filter((x) => x !== null);
    setFeed((feed) => [...feed, ...transformFeed(posts)]);
  }, []);

  function handlePostSelection(post) {
    setPost(post);
  }

  return (
    <HomeLayout>
      <FollowedCreatorsSection />
      <GridItem gridArea="feed">
        <InfiniteScroll items={feed} next={getNext}>
          <Feed posts={feed} onPostClick={handlePostSelection} />
        </InfiniteScroll>
      </GridItem>
      <PostDisplay post={currentPost} />
    </HomeLayout>
  );
}
