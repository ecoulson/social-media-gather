import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const CreatorName = styled(Text)`
font-size: 18px;
font-weight: 600;
`;

export default ({user}) => {
    return (
        <CreatorName>{user.username}</CreatorName>
    )
}