import { Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Layout = styled(Grid)`
grid-template-areas:
    "media-icon author more"
    "media-icon time more";
grid-template-columns: 75px auto 75px;
grid-area: header
`;

export default Layout;