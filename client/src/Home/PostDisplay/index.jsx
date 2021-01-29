import React from "react";
import Post from "../Feed/Post";
import Comments from "./Comments";
import PostDisplayLayout from "./Layout";

export default function PostDisplay({ post }) {
  return (
    <PostDisplayLayout>
      <Post post={post} />
      <Comments post={post} />
    </PostDisplayLayout>
  );
}
