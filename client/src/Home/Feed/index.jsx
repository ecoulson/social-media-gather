import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import DateDivider from "./DateDivider";
import Post from "./Post";

const FeedContainer = styled(Flex)`
flex-direction: column;
max-height: calc(100vh - 75px);
border-right: 1px solid black;
`;

export default () => {
    return (
        <FeedContainer>
            <DateDivider date={new Date("10/16/2000")} />
            <Post />
        </FeedContainer>
    )
}