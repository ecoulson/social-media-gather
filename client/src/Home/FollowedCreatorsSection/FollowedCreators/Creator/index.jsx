import { Avatar, Spacer } from "@chakra-ui/react";
import React from "react";
import CreatorContainer from "./CreatorContainer";
import CreatorDetails from "./CreatorDetails";
import CreatorFollowers from "./CreatorFollowers";

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