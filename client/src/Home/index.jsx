import { GridItem } from "@chakra-ui/react";
import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import isAuthenticated from "../Auth/IsAuthenticated";
import InfiniteScroll from "../InfiniteScroll";
import transformFeed from "../InfiniteScroll/FeedTransformer";
import GetUser from "../Library/GetUser";
import Feed from "./Feed";
import FollowedCreatorsSection from "./FollowedCreatorsSection";
import HomeLayout from "./HomeLayout";
import PostDisplay from "./PostDisplay";

export default function Home() {
  const history = useHistory();
  const [currentPost, setPost] = useState(null);
  const [feed, setFeed] = useState([]);

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

  async function getNext(index) {
    const response = await Axios.get(`/api/feed?offset=${index}`);
    const posts = await Promise.all(
      response.data.data.posts.map(async (post) => {
        const creator = await GetUser(post.creatorId);
        post.channelName = creator.username;
        return post;
      })
    );
    setFeed((feed) => [...feed, ...transformFeed(posts)]);
  }

  return (
    <HomeLayout>
      <FollowedCreatorsSection />
      <GridItem gridArea="feed">
        <InfiniteScroll next={getNext}>
          <Feed posts={feed} onPostClick={handlePostSelection} />
        </InfiniteScroll>
      </GridItem>
      <PostDisplay post={currentPost} />
    </HomeLayout>
  );
}
