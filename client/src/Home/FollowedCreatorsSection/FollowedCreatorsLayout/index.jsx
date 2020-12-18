import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import styled from "@emotion/styled";

const FollowedCreatorsLayout = styled(GridItem)`
max-height: calc(100vh - 75px);
grid-area: followed;
`

const GridLayout = styled(Grid)`
grid-template-rows: 50px auto 60px;
height: calc(100vh - 75px);
border-right: 1px solid black;
box-sizing: border-box;
padding: 20px;
grid-template-areas:
    "header"
    "followed-creators"
    "add-creator";
`;

export default ({children}) => {
    return (
        <FollowedCreatorsLayout>
            <GridLayout>
                {children}
            </GridLayout>
        </FollowedCreatorsLayout>
    );
}
