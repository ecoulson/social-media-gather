import Axios from "axios";

export default async function GetFollowedUsers(followedIds) {
    const responses = await Promise.all(followedIds.map((followId) => {
        return Axios.get(`/api/users/${followId}`);
    }));
    return responses.map((response) => response.data.data.users[0]);
}