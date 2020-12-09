import { GridItem, Text } from "@chakra-ui/react";
import React from "react";
import styled from "@emotion/styled";
import CollapseButton from "./CollapseButton";

const StyledHeader = styled(Text)`
position: relative;
font-size: 24px;
display: flex;
align-items: center;
font-weight: 700;
`;

export default function FollowedCreatorsHeader() {
    return (
        <GridItem gridArea="header">
            <StyledHeader>
                Followed Creators: 
                <CollapseButton />
            </StyledHeader>
        </GridItem>
    )
}