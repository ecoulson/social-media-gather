import { GridItem, Text } from "@chakra-ui/react";
import React from "react";
import styled from "@emotion/styled";
import CollapseButton from "./CollapseButton";

const FollowedCreatorsHeaderLayout = styled(GridItem)`
grid-area: header;
`;

const FollowedCreatorsHeader = styled(Text)`
position: relative;
font-size: 24px;
display: flex;
align-items: center;
font-weight: 700;
`;

export default () => {
    return (
        <FollowedCreatorsHeaderLayout>
            <FollowedCreatorsHeader>
                Followed Creators: <CollapseButton />
            </FollowedCreatorsHeader>
        </FollowedCreatorsHeaderLayout>
    )
}