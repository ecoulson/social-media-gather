import React, { useEffect, useState } from "react";
import InfiniteScroll from "../../InfiniteScroll";
import Post from "../Feed/Post";
import Comments from "./Comments";
import PostDisplayLayout from "./Layout";
import GetComments from "../../Library/GetComments";

export default function PostDisplay({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function handleGetComments() {
      const comments = await GetComments(post.id, 0);
      setComments(comments);
    }

    if (post) {
      setComments([]);
      handleGetComments();
    }
  }, [post]);

  function getCommentCount() {
    return post.reactions
      .filter((reaction) => reaction.type === "comments")
      .map((reaction) => reaction.value);
  }

  if (!post) {
    return null;
  }

  async function getNextComments(index) {
    if (comments.length !== getCommentCount()) {
      const newComments = await GetComments(post.id, index);
      setComments((comments) => [...comments, ...newComments]);
    }
  }

  console.log(comments);

  return (
    <PostDisplayLayout>
      <InfiniteScroll items={comments} next={getNextComments}>
        <Post post={post} />
        <Comments comments={comments} />
      </InfiniteScroll>
    </PostDisplayLayout>
  );
}
