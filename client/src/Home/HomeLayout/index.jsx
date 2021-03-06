import React from "react";
import { Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";

const GridLayout = styled(Grid)`
  max-height: 100%;
  max-width: 100%;
  overflow-y: hidden;
  grid-template-columns: 25% 40% 35%;
  grid-template-areas: "followed feed post";
  grid-template-rows: 100%;
`;

export default function HomeLayout(props) {
  return <GridLayout>{props.children}</GridLayout>;
}
