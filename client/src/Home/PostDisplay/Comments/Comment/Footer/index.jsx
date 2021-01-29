import { GridItem } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import Reactions from "../../../../Feed/Post/Reactions";

const Layout = styled(GridItem)`
  grid-area: footer;
  margin-top: 15px;
  margin-left: 15px;
`;

export default ({ comment }) => {
  return (
    <Layout>
      <Reactions
        reactions={[
          {
            type: "likes",
            value: comment.likes,
          },
          {
            type: "dislikes",
            value: comment.dislikes,
          },
          {
            type: "comments",
            value: comment.replyCount,
          },
        ]}
      />
    </Layout>
  );
};
