import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Creator from "./Creator";
import FollowedCreatorsContainer from "./FollowedCreatorsContainer";
import GetFollowedUsers from "./GetFollowedUsers";
import GetMe from "./GetMe";

export default function FollowedCreators() {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        async function getFollowedUsers() {
            const me = await GetMe();
            const followedUsers = await GetFollowedUsers(me.following);
            setUsers(followedUsers.filter(user => user._id !== me._id));
        }

        getFollowedUsers();
    }, [])

    return (
        <FollowedCreatorsContainer>
            {users.map((user) => <Creator user={user} />)}
        </FollowedCreatorsContainer>
    )
}