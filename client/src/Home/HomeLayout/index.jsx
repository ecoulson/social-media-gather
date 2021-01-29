import React from "react";
import { Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";

const GridLayout = styled(Grid)`
  max-height: 100%;
  overflow: hidden;
  grid-template-columns: 25% 42.5% 32.5%;
  grid-template-areas: "followed feed post";
  grid-template-rows: 100%;
`;

export default function HomeLayout(props) {
  return <GridLayout>{props.children}</GridLayout>;
}
