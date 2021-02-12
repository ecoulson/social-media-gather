import { GridItem } from "@chakra-ui/react";
import Axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import isAuthenticated from "../Auth/IsAuthenticated";
import InfiniteScroll from "../InfiniteScroll";
import Cookie from "../Library/Cookie";
import transformFeed from "../Library/FeedTransformer";
import GetUser from "../Library/GetUser";
import Feed from "./Feed";
import FollowedCreatorsSection from "./FollowedCreatorsSection";
import HomeLayout from "./HomeLayout";
import PostDisplay from "./PostDisplay";

export default function Home() {
  const history = useHistory();
  const [currentPost, setPost] = useState(null);
  const [feed, setFeed] = useState([]);

  const getNext = useCallback(async (index) => {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/feed?offset=${index}`,
      {
        headers: {
          Authorization: `Bearer ${Cookie.getCookie("token")}`,
        },
      }
    );
    let posts = await Promise.all(
      response.data.data.posts.map(async (post) => {
        console.log(post);
        if (post.creatorId) {
          const creator = await GetUser(post.creatorId);
          post.channelName = creator.username;
          return post;
        }
        return null;
      })
    );
    posts = posts.filter((x) => x !== null);
    setFeed((feed) => [...feed, ...transformFeed(posts)]);
  }, []);

  useEffect(() => {
    async function checkAuthenticated() {
      if (!(await isAuthenticated())) {
        history.push("/login");
      }
    }

    checkAuthenticated();
  }, [history]);

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
