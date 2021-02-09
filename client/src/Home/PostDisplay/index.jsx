import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "../../InfiniteScroll";
import Post from "../Feed/Post";
import Comments from "./Comments";
import PostDisplayLayout from "./Layout";
import GetComments from "../../Library/GetComments";

export default function PostDisplay({ post }) {
  const [comments, setComments] = useState([]);

  const getNextComments = useCallback(
    async (index) => {
      const newComments = await GetComments(post.id, post.type, index);
      setComments((comments) => [...comments, ...newComments]);
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

  return (
    <PostDisplayLayout>
      <InfiniteScroll items={comments} next={getNextComments}>
        <Post post={post} />
        <Comments comments={comments} />
      </InfiniteScroll>
    </PostDisplayLayout>
  );
}
