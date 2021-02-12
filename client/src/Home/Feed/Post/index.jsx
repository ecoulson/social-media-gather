import React from "react";
import Media from "./Media";
import Layout from "./Layout";
import Header from "./Header";
import Reactions from "./Reactions";
import Title from "./Title";

export default ({ post, onClick }) => {
  if (!post) {
    return null;
  }

  function handleClick() {
    if (onClick) {
      onClick(post);
    }
  }

  return (
    <Layout onClick={handleClick}>
      <Header date={post.publishedAt} type={post.type} author={post.author} />
      <Media type={post.type} media={post.media} />
      <Reactions reactions={post.reactions} />
      <Title title={post.title} />
    </Layout>
  );
};
