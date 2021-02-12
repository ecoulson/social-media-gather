import { GridItem, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const Author = styled(Link)`
  font-weight: 800;
  font-size: 20px;
`;

export default ({ author }) => {
  return (
    <GridItem gridArea="author">
      <Author href={`/profile/${author}`}>@{author}</Author>
    </GridItem>
  );
};
