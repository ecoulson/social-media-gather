import { Avatar, Link, Spacer } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import CreatorDetails from "./CreatorDetails";
import CreatorFollowers from "./CreatorFollowers";

const CreatorContainer = styled(Link)`
margin: 5px 0;
padding: 5px;
align-items: center;
display: flex;
`

export default function Creator({user}) {
    return (
        <CreatorContainer href={`/profile/${user.username}`}>
            <Avatar user={user} />
            <CreatorDetails user={user} />
            <Spacer />
            <CreatorFollowers user={user} />
        </CreatorContainer>
    )
}