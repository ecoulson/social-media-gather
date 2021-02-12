import React from "react";
import { GridItem } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Layout = styled(GridItem)`
  grid-area: post;
`;

export default function PostDisplayLayout({ children }) {
  return <Layout>{children}</Layout>;
}
