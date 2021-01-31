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
import GetUser from "../Library/GetUser";
import Loader from "../Loader";
import Panel from "../Panel";
import "./index.css";

export default function Me() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [feed, setFeed] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  const getNext = useCallback(
    async (index) => {
      const response = await Axios.get(`/api/feed/${user.id}?offset=${index}`);
      const posts = await Promise.all(
        response.data.data.posts.map(async (post) => {
          const creator = await GetUser(post.creatorId);
          post.channelName = creator.username;
          return post;
        })
      );
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
      const response = await Axios.get("/api/auth/me", {
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
