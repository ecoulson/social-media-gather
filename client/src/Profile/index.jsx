import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../Button";
import InfiniteScroll from "../InfiniteScroll";
import { ReactComponent as Check } from "../Assets/check.svg";
import Cookie from "../Library/Cookie";
import "./index.css";
import { useRef } from "react";
import Feed from "../Home/Feed";
import HomeLayout from "../Home/HomeLayout";
import FollowedCreatorsSection from "../Home/FollowedCreatorsSection";
import { GridItem } from "@chakra-ui/react";
import GetUser from "../Library/GetUser";
import transformFeed from "../InfiniteScroll/FeedTransformer";
import PostDisplay from "../Home/PostDisplay";

export default function Profile(props) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);
  const followButton = useRef(null);
  const [feed, setFeed] = useState([]);
  const [currentPost, setPost] = useState(null);

  useEffect(() => {
    async function getUser() {
      const response = await Axios.get(
        `/api/users/username/${props.match.params.username}`
      );
      setUser(response.data.data.users[0]);
    }

    async function isFollowing() {
      const response = await Axios.get(
        `/api/users/is-following/${props.match.params.username}`,
        {
          headers: {
            authorization: `Bearer ${Cookie.getCookie("token")}`,
          },
        }
      );
      setFollowing(response.data.data.isFollowing);
    }

    getUser();
    isFollowing();
  }, [props.match.params.username, history]);

  async function follow() {
    await Axios.put(`/api/users/follow/${user.id}`);
    setFollowing(true);
    followButton.current.blur();
  }

  async function unfollow() {
    await Axios.put(`/api/users/unfollow/${user.id}`);
    setFollowing(false);
    followButton.current.blur();
  }

  if (!user) {
    return null;
  }

  function renderFollowButton() {
    if (following) {
      return (
        <Button
          innerRef={followButton}
          onClick={unfollow}
          id="following-button"
        >
          Following <Check className="following-check" />
        </Button>
      );
    }
    return (
      <Button innerRef={followButton} id="follow-button" onClick={follow}>
        Follow
      </Button>
    );
  }

  async function getNext(index) {
    const response = await Axios.get(`/api/feed/${user.id}?offset=${index}`);
    const posts = await Promise.all(
      response.data.data.posts.map(async (post) => {
        const creator = await GetUser(post.creatorId);
        post.channelName = creator.username;
        return post;
      })
    );
    setFeed((feed) => [...feed, ...transformFeed(posts)]);
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
