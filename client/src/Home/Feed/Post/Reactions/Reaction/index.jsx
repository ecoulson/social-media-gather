import { Flex, Icon, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import {
  AiFillDislike,
  AiFillEye,
  AiFillHeart,
  AiFillLike,
  AiOutlineRetweet,
} from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import ConvertNumberToPlaces from "../../../../../Library/ConvertNumberToPlaces";

const Layout = styled(Flex)`
  align-items: center;
  width: 100px;
  border: 1px solid black;
  border-radius: 50px;
  padding: 0px 10px;
  margin-right: 10px;
  box-sizing: border-box;
  justify-content: space-between;
`;

export default ({ type, value }) => {
  return (
    <Layout>
      <Icon as={getIcon(type)} />
      <Text>{ConvertNumberToPlaces(value)}</Text>
    </Layout>
  );
};

function getIcon(type) {
  switch (type) {
    case "views":
      return AiFillEye;
    case "likes":
      return AiFillLike;
    case "dislikes":
      return AiFillDislike;
    case "favorites":
      return AiFillHeart;
    case "comments":
      return FaComment;
    case "retweets":
      return AiOutlineRetweet;
    default:
      return null;
  }
}
