import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import CreatorMedias from "../CreatorMedias";
import CreatorName from "./CreatorName";

const CreatorDetailsContainer = styled(Flex)`
margin-left: 10px;
flex-direction: column;
`;

export default function CreatorDetails({ user }) {
    return (
        <CreatorDetailsContainer>
            <CreatorName user={user} />
            <CreatorMedias user={user} />
        </CreatorDetailsContainer>
    )
}