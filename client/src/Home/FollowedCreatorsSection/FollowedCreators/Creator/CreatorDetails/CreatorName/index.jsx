import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const StyledText = styled(Text)`
font-size: 18px;
font-weight: 600;
`;

export default function CreatorName({user}) {
    return (
        <StyledText>{user.username}</StyledText>
    )
}