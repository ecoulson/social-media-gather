import { GridItem } from "@chakra-ui/react";
import Axios from "axios";
import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import isAuthenticated from "../Auth/IsAuthenticated";
import Feed from "../Home/Feed";
import FollowedCreatorsSection from "../Home/FollowedCreatorsSection";
import HomeLayout from "../Home/HomeLayout";
import PostDisplay from "../Home/PostDisplay";
import InfiniteScroll from "../InfiniteScroll";
import transformFeed from "../Library/FeedTransformer";
import Cookie from "../Library/Cookie";
import Loader from "../Loader";
import Panel from "../Panel";
import "./index.css";
import GetEndpoint from "../API/GetEndpoint";
import GetChannels from "../Home/FollowedCreatorsSection/FollowedCreators/Creator/CreatorMedias/GetChannels";

export default function Me() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [feed, setFeed] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  const getNext = useCallback(
    async (index) => {
      const response = await Axios.get(
        `${GetEndpoint()}/api/feed/${user.id}?offset=${index}`,
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
      const posts = response.data.data.posts.map((post) => {
        post.channelName = channelMap.get(post.channelId).name;
        return post;
      });
      setFeed((feed) => [...feed, ...transformFeed(posts)]);
    },
    [user]
  );

  useEffect(() => {
    async function checkAuthenticated() {
      if (!(await isAuthenticated())) {
        history.push("/login");
      } else {
        getMe();
      }
    }

    async function getMe() {
      const response = await Axios.get(`${GetEndpoint()}/api/auth/me`, {
        headers: {
          authorization: `Bearer ${Cookie.getCookie("token")}`,
        },
      });
      setUser(response.data.data.users[0]);
    }

    checkAuthenticated();
  }, [history]);

  if (!user) {
    return (
      <Panel>
        <Loader />
      </Panel>
    );
  }

  return (
    <HomeLayout>
      <FollowedCreatorsSection />
      <GridItem gridArea="feed">
        <InfiniteScroll items={feed} next={getNext}>
          <Feed posts={feed} onPostClick={setCurrentPost} />
        </InfiniteScroll>
      </GridItem>
      <PostDisplay post={currentPost} />
    </HomeLayout>
  );
}
