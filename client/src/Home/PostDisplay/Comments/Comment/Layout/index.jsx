import { Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Layout = styled(Grid)`
  grid-template-areas:
    "header"
    "body"
    "footer";
  margin: 10px 0;
  border-top: 1px solid black;
`;

export default Layout;
