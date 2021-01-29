import React from "react";
import { GridItem } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Layout = styled(GridItem)`
  max-height: calc(100vh - 75px);
  grid-area: post;
  overflow: scroll;
`;

export default function PostDisplayLayout({ children }) {
  return <Layout>{children}</Layout>;
}
