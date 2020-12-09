import Axios from "axios";

export default async function GetFollowedUsers(followedIds) {
    const responses = await Promise.all(followedIds.map((followId) => {
        return Axios.get(`/api/users/get-by-id/${followId}`);
    }));
    return responses.map((response) => response.data);
}