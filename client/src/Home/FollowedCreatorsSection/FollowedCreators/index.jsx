import { GridItem } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Creator from "./Creator";
import GetFollowedUsers from "./GetFollowedUsers";
import GetMe from "./GetMe";

const FollowedCreatorContainer = styled(GridItem)`
grid-area: followed-creators;
display: flex;
flex-direction: column;
`

export default function FollowedCreators() {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        async function getFollowedUsers() {
            const me = await GetMe();
            const users = await GetFollowedUsers(me.following);
            setUsers(users.filter(user => user._id !== me._id));
        }

        getFollowedUsers();
    }, [])

    return (
        <FollowedCreatorContainer>
            {users.map((user) => <Creator user={user} />)}
        </FollowedCreatorContainer>
    )
}