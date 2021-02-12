import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "../InfiniteScroll";
import "./index.css";
import Feed from "../Home/Feed";
import HomeLayout from "../Home/HomeLayout";
import FollowedCreatorsSection from "../Home/FollowedCreatorsSection";
import { GridItem } from "@chakra-ui/react";
import GetUser from "../Library/GetUser";
import transformFeed from "../Library/FeedTransformer";
import PostDisplay from "../Home/PostDisplay";
import { useCallback } from "react";
import Cookie from "../Library/Cookie";
import GetEndpoint from "../Library/GetEndpoint";

export default function Profile(props) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [feed, setFeed] = useState([]);
  const [currentPost, setPost] = useState(null);

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
    async function getUser() {
      const response = await Axios.get(
        `${GetEndpoint()}/api/users/username/${props.match.params.username}`
      );
      setUser(response.data.data.users[0]);
    }

    getUser();
  }, [props.match.params.username, history]);

  if (!user) {
    return null;
  }

  function handlePostClick(post) {
    setPost(post);
  }

  return (
    <HomeLayout>
      <FollowedCreatorsSection />
      <GridItem gridArea="feed">
        <InfiniteScroll items={feed} next={getNext}>
          <Feed posts={feed} onPostClick={handlePostClick} />
        </InfiniteScroll>
      </GridItem>
      <PostDisplay post={currentPost} />
    </HomeLayout>
  );
}
