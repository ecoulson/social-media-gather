import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "../../InfiniteScroll";
import Post from "../Feed/Post";
import Comments from "./Comments";
import PostDisplayLayout from "./Layout";
import GetComments from "../../Library/GetComments";
import { Box } from "@chakra-ui/react";

export default function PostDisplay({ post }) {
  const [comments, setComments] = useState([]);

  const getNextComments = useCallback(
    async (index) => {
      const newComments = await GetComments(post.id, post.type, index);
      if (newComments) {
        setComments((comments) => [...comments, ...newComments]);
      }
    },
    [post]
  );

  useEffect(() => {
    async function handleGetComments() {
      const comments = await GetComments(post.id, post.type, 0);
      setComments(comments);
    }

    if (post) {
      setComments([]);
      handleGetComments();
    }
  }, [post]);

  if (!post) {
    return null;
  }

  console.log(post);

  if (post.type === "TWITCH_STREAM") {
    return (
      <PostDisplayLayout>
        <Box height="100%" overflowY="scroll">
          <Post post={post} />
          <iframe
            title={`${post.author}'s stream`}
            id="chat_embed"
            src={`https://www.twitch.tv/embed/${post.author}/chat?parent=${window.location.hostname}`}
            height="100%"
            width="100%"
          />
        </Box>
      </PostDisplayLayout>
    );
  }

  return (
    <PostDisplayLayout>
      <InfiniteScroll items={comments} next={getNextComments}>
        <Post post={post} />
        <Comments comments={comments} />
      </InfiniteScroll>
    </PostDisplayLayout>
  );
}
