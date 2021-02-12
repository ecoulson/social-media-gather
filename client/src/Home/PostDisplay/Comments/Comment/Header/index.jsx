import { Avatar, Flex, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import moment from "moment";
import styled from "@emotion/styled";

const Layout = styled(GridItem)`
  grid-area: header;
  padding-top: 8px;
`;

const ProfileImage = styled(Avatar)`
  margin: 5px 10px 0 15px;
`;

const DisplayName = styled(Text)`
  font-weight: 700;
`;

const CommentDate = styled(Text)`
  margin-left: auto;
  margin-right: 15px;
  font-weight: 400;
  color: #757575;
`;

export default ({ comment }) => {
  return (
    <Layout>
      <Flex alignItems="center">
        <ProfileImage src={comment.profileImage.url} />
        <DisplayName>{comment.username}</DisplayName>
        <CommentDate>{moment(comment.dateCreated).fromNow()}</CommentDate>
      </Flex>
    </Layout>
  );
};
