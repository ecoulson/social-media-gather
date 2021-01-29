import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import TextDivider from "./TextDivider";
import Post from "./Post";
import moment from "moment";

const FeedContainer = styled(Flex)`
  flex-direction: column;
  border-right: 1px solid black;
  overflow-y: scroll;
  min-height: 100%;
  box-sizing: border-box;
  padding-top: 4px;
`;

export default ({ posts, scrollRef, onPostClick }) => {
  const renderFeed = () => {
    let currentDate = "";
    return posts.map((post, i) => {
      const newDate = moment(post.publishedAt).format("D/M/YYYY");
      if (newDate !== currentDate) {
        currentDate = newDate;
        return [
          <TextDivider
            text={moment(post.publishedAt).format("dddd, MMMM Do")}
          />,
          <Post onClick={onPostClick} key={i} post={post} />,
        ];
      } else {
        return <Post onClick={onPostClick} key={i} post={post} />;
      }
    });
  };

  return <FeedContainer ref={scrollRef}>{renderFeed()}</FeedContainer>;
};
