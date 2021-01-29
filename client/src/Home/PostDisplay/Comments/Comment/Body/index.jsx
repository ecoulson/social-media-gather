import { GridItem, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const Layout = styled(GridItem)`
  grid-area: body;
  padding: 10px 25px 0;
`;

const CommentText = styled(Text)``;

export default ({ comment }) => {
  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  return (
    <Layout>
      <CommentText>{htmlDecode(comment.text)}</CommentText>
    </Layout>
  );
};
