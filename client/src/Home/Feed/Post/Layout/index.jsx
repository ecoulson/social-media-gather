import { Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Layout = styled(Grid)`
padding: 10px 75px 25px;
grid-template-areas:
    "header"
    "media"
    "reactions"
    "title";
border-bottom: 1px solid gray;
`;

export default Layout;