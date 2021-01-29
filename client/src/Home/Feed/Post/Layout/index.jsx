import { Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Layout = styled(Grid)`
  padding: 10px 75px 25px;
  box-sizing: border-box;
  grid-template-areas:
    "header"
    "media"
    "reactions"
    "title";
  border-bottom: 1px solid gray;
  &:hover {
    background-color: rgb(240, 240, 240);
    cursor: pointer;
  }
`;

export default Layout;
